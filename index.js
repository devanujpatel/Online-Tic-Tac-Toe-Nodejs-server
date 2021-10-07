var express = require('express');
var socket = require('socket.io')

var play_game = require('./game')

// App setup 
var app = express();
var server = app.listen(9999, function(){
    console.log('Listening on port 9999')
})

// Socket setup
var io = socket(server);

// contains all information of active games
game = {};
// keeping count of active players
idCount = 0
game_id_count = 0
ready_players = [];



io.on('connection', (socket)=>{
    console.log('Made socket connection')

    socket.on("play", ()=>{
        idCount ++;
        console.log("match fixing started")
        console.log("id= "+idCount+" game_id = "+game_id_count)
        if (idCount%2 === 1){
            // wait for one more player
            // until then create a game
            ready_players.push(socket);
            game_id_count ++;
            game[game_id_count] = {"p1":{"id":idCount, "mark":'X'}, "p2":{}, "game_board":{"a1":"", "a2":"", "a3":"","b1":"","b2":"","b3":"","c1":"","c2":"","c3":""}, "count": 0} // add here when necessary

        }else{
            // this guy has a opponent ready
            var opponent = ready_players.pop();

            game[game_id_count]["p2"] = {"id":idCount, "mark":'O'} // add here when necessary

            opponent.emit('game on', {
                "id": game[game_id_count]["p1"]["id"],
                "game_id": game_id_count,
                "chance": game[game_id_count]["p1"]["mark"]
              });
            socket.emit('game on', {
                "id": game[game_id_count]["p2"]["id"],
                "game_id": game_id_count,
                "chance": game[game_id_count]["p2"]["mark"]
              });
        
            // play game carries the main logic of the game
            // it returns game id count since the one beared in this file is bound to change during the course of the game
            gic = play_game.play_game(game[game_id_count], opponent, socket);
            

        }

    });

    socket.on('game over', (gic)=>{
        console.log("id")
            console.log(idCount)
            console.log(ready_players.length)
            console.log(game)


            idCount --;
            if (idCount < 0){
                idCount = 0;
            }
            // clear everything about the game 
            delete ready_players[ready_players.indexOf(socket)]
            // since we are expecting two android clients to send the same thing
            if (game[gic]){
                delete game[gic]
            }

            console.log(idCount)
            console.log(ready_players.length)
            console.log(game)
    })

    // when user disconnects
    socket.on('disconnect', ()=> {
        console.log('A user disconnected');
    });
})
