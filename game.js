var equality = require('./equality');

exports.play_game = function play_game(game_info, p1, p2){
    
    p1.on("button click", (data)=>{

        game_info["game_board"][data] = 'X'

        game_info["count"] = game_info["count"] + 1;
        console.log("game info count: "+ game_info["count"]);
        winner = check_winner(game_info["chance"], game_info["count"],game_info["game_board"], p1, p2)

        game_info["chance"] = 'O'
        emit_btn_click(data, 'X', p1, p2, 'O')
    
    })

    p2.on("button click", (data)=>{
        console.log(data)
        console.log("btn clicked")
        game_info["game_board"][data] = 'O'

        game_info["count"] = game_info["count"] + 1;
        console.log("game info count: "+ game_info["count"]);
        winner = check_winner(game_info["chance"], game_info["count"], game_info["game_board"], p1, p2)

        game_info["chance"] = 'X'
        emit_btn_click(data, 'O', p1, p2, 'X')


    })

}

function emit_btn_click(btn_pos, btn_mark, p1, p2, chance){
    p1.emit("btn clicked", {"btn position":btn_pos, "btn mark":btn_mark, "chance":chance})
    p2.emit("btn clicked", {"btn position":btn_pos, "btn mark":btn_mark, "chance":chance})

}

function check_winner(mark, count, game_board, p1, p2){
    console.log("count: ")
    console.log(count)
    if (count>4){

        console.log(game_board)

        if (equality.areEqual([game_board["a1"],game_board["a2"],game_board["a3"],mark]) === true){
            console.log(1)
            p1.emit("result", {"winner":mark})
            p2.emit("result", {"winner":mark})
            return;
        }

        if (equality.areEqual([game_board["b1"],game_board["b2"],game_board["b3"],mark]) === true){
            p1.emit("result", {"winner":mark})
            p2.emit("result", {"winner":mark})
            console.log(2)
            return;
        }

        if (equality.areEqual([game_board["c1"],game_board["c2"],game_board["c3"],mark]) === true){
            p1.emit("result", {"winner":mark})
            p2.emit("result", {"winner":mark})        
            console.log(3)
            return;
        }

        if (equality.areEqual([game_board["a1"],game_board["b1"],game_board["c1"],mark]) === true){
            console.log(mark+ " wins")
            p1.emit("result", {"winner":mark})
            p2.emit("result", {"winner":mark})        
            console.log(4)
            return;
        }

        if (equality.areEqual([game_board["a2"],game_board["b2"],game_board["c2"],mark]) === true){
            p1.emit("result", {"winner":mark})
            p2.emit("result", {"winner":mark})        
            console.log(5)
            return;
        }

        if (equality.areEqual([game_board["a3"],game_board["b3"],game_board["c3"],mark]) === true){
            p1.emit("result", {"winner":mark})
            p2.emit("result", {"winner":mark}) 
            console.log(6)
            return;
        }

        if (equality.areEqual([game_board["a1"],game_board["b2"],game_board["c3"],mark]) === true){
            p1.emit("result", {"winner":mark})
            p2.emit("result", {"winner":mark})
            console.log(7)
            return;
        }

        if (equality.areEqual([game_board["a3"],game_board["b2"],game_board["c1"],mark]) === true){
            p1.emit("result", {"winner":mark})
            p2.emit("result", {"winner":mark})
            console.log(8)
            return;
        }

        if (count === 9){
            p1.emit("result", {"winner":"tie"})
            p2.emit("result", {"winner":"tie"})
            return;
        }

    }
}
