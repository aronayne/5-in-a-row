const request = require('request');
var assert = require('assert');
var express = require('express')
var app = express()
var app = require('express')();

app.use('/', express.static(__dirname + '/'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000);

names = []
var nameIndex = -1

// Return the number of players
app.get('/player/numberplayers', function(req, res) {
    res.send({
        numberplayers: names.length
    })
})

// Add a player to the game
app.get('/player/add', function(req, res) {

    nameIndex = nameIndex + 1
    names[nameIndex] = [req.query.playername]

    res.send({status:"1"})
})

// Rest all variables in order to initiaite a new game
app.get('/game/reset', function(req, res) {
    names = []
    resetBoard()
    nameIndex = -1
    res.send({
        success: "1"
    });
})

// function createArray
function getBoard() {
    var arr = [];

    var numberElements = 9
    var row1 = Array(numberElements).fill(' ')
    var row2 = Array(numberElements).fill(' ')
    var row3 = Array(numberElements).fill(' ')
    var row4 = Array(numberElements).fill(' ')
    var row5 = Array(numberElements).fill(' ')
    var row6 = Array(numberElements).fill(' ')

    arr.push(row1);
    arr.push(row2);
    arr.push(row3);
    arr.push(row4);
    arr.push(row5);
    arr.push(row6);

    return arr
}

var board = getBoard()

function resetBoard() {
    board = getBoard()
}


function applicationTests() {

    // Test winner for X on vertical
    //[[ 'O', 'X', 'X', 'X', 'X', 'X', 'O', 'O', 'O' ],
    // [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    // [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    // [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    // [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    // [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ] ]
    resetBoard()
    board[0][0] = 'O'
    board[0][1] = 'X'
    board[0][2] = 'X'
    board[0][3] = 'X'
    board[0][4] = 'X'
    board[0][5] = 'X'
    board[0][6] = 'O'
    board[0][7] = 'O'
    board[0][8] = 'O'
    assert(isWinner() == true)

    // Test winner for X on horizontal
    // [[ 'O', ' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ' ],
    //  [ 'O', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    //  [ 'O', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    //  [ 'O', ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ' ],
    //  [ 'O', ' ', ' ', ' ', ' ', ' ', ' ', 'X', ' ' ],
    //  [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X' ] ]
    resetBoard()
    board[0][0] = 'O'
    board[1][0] = 'O'
    board[2][0] = 'O'
    board[3][0] = 'O'
    board[4][0] = 'O'
    board[0][5] = 'X'
    board[3][6] = 'X'
    board[4][7] = 'X'
    board[5][8] = 'X'
    assert(isWinner() == true)

    // Test winner for X on diagonal from upper left to lower right
    // [[ 'O', 'O', 'O', 'O', ' ', ' ', ' ', ' ', ' ' ],
    //  [ ' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' ' ],
    //  [ ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ' ],
    //  [ ' ', ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ' ],
    //  [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', ' ' ],
    //  [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X' ] ]
    resetBoard()
    board[0][0] = 'O'
    board[0][1] = 'O'
    board[0][2] = 'O'
    board[0][3] = 'O'
    board[1][4] = 'X'
    board[2][5] = 'X'
    board[3][6] = 'X'
    board[4][7] = 'X'
    board[5][8] = 'X'
    assert(isWinner() == true)

    // Testing diaganol left to right
    // [[' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ' ],
    // [ ' ', ' ', ' ', ' ', 'O', ' ', ' ', ' ', ' ' ],
    // [ ' ', ' ', ' ', 'O', ' ', ' ', ' ', ' ', ' ' ],
    // [ ' ', ' ', 'O', ' ', ' ', ' ', 'O', ' ', ' ' ],
    // [ ' ', 'O', ' ', ' ', ' ', ' ', ' ', '0', ' ' ],
    // [ 'O', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X' ]]
    resetBoard()
    board[5][0] = 'O'
    board[4][1] = 'O'
    board[3][2] = 'O'
    board[2][3] = 'O'
    board[1][4] = 'O'
    board[0][5] = 'X'
    board[3][6] = 'O'
    board[4][7] = '0'
    board[5][8] = 'X'
    assert(isWinner() == true)

    //Test no winner for this board
   // [[ ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ' ],
   //  [ ' ', ' ', ' ', ' ', 'O', ' ', ' ', ' ', ' ' ],
   //  [ ' ', ' ', ' ', 'O', ' ', ' ', ' ', ' ', ' ' ],
   //  [ ' ', ' ', 'X', ' ', ' ', ' ', 'O', ' ', ' ' ],
   //  [ ' ', 'O', ' ', ' ', ' ', ' ', ' ', '0', ' ' ],
   //  [ 'O', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X' ]]
    resetBoard()
    board[5][0] = 'O'
    board[4][1] = 'O'
    board[3][2] = 'X'
    board[2][3] = 'O'
    board[1][4] = 'O'
    board[0][5] = 'X'
    board[3][6] = 'O'
    board[4][7] = '0'
    board[5][8] = 'X'
    assert(isWinner() == false)

    // Test diaganol from lower left to upper right
    // [[ ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ' ],
    // [ ' ', ' ', ' ', ' ', ' ', 'O', ' ', ' ', ' ' ],
    // [ ' ', ' ', ' ', ' ', 'O', ' ', ' ', ' ', ' ' ],
    // [ ' ', ' ', ' ', 'O', ' ', ' ', 'O', ' ', ' ' ],
    // [ ' ', ' ', 'O', ' ', ' ', ' ', ' ', '0', ' ' ],
    // [ ' ', 'O', ' ', ' ', ' ', ' ', ' ', ' ', 'X' ]]
    resetBoard()
    board[5][1] = 'O'
    board[4][2] = 'O'
    board[3][3] = 'O'
    board[2][4] = 'O'
    board[1][5] = 'O'
    board[0][5] = 'X'
    board[3][6] = 'O'
    board[4][7] = '0'
    board[5][8] = 'X'
    assert(isWinner() == true)

    //Test no winner for this board
    // [[' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ' ],
    // [ ' ', ' ', ' ', ' ', ' ', 'O', ' ', ' ', ' ' ],
    // [ ' ', ' ', ' ', ' ', 'O', ' ', ' ', ' ', ' ' ],
    // [ ' ', ' ', ' ', 'X', ' ', ' ', 'O', ' ', ' ' ],
    // [ ' ', ' ', 'O', ' ', ' ', ' ', ' ', '0', ' ' ],
    // [ ' ', 'O', ' ', ' ', ' ', ' ', ' ', ' ', 'X' ]]
    resetBoard()
    board[5][1] = 'O'
    board[4][2] = 'O'
    board[3][3] = 'X'
    board[2][4] = 'O'
    board[1][5] = 'O'
    board[0][5] = 'X'
    board[3][6] = 'O'
    board[4][7] = '0'
    board[5][8] = 'X'
    assert(isWinner() == false)

    // Test diaganol from lower left to upper right
    // Testing this board : is valid so should return true
    // [[ ' ', ' ', ' ', ' ', ' ', 'O', ' ', ' ', ' ' ],
    //  [ ' ', ' ', ' ', ' ', 'O', ' ', ' ', ' ', ' ' ],
    //  [ ' ', ' ', ' ', 'O', ' ', ' ', ' ', ' ', ' ' ],
    //  [ ' ', ' ', 'O', ' ', ' ', ' ', ' ', ' ', ' ' ],
    //  [ ' ', 'O', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    //  [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ]]
    resetBoard()
    board[4][1] = 'O'
    board[3][2] = 'O'
    board[2][3] = 'O'
    board[1][4] = 'O'
    board[0][5] = 'O'
    assert(isWinner() == true)

}

//Execute the tests as part of server startup
applicationTests()

//Determine the winner of the game. This function is invoked per game move.
function isWinner() {

    console.log('board is', board)

    //determine if winner contained within row
    for (var i = 0; i < 6; i++) {
        for (var ii = 0; ii < 6; ii++) {
            if ((board[ii][i] == 'X' || board[ii][i] == 'O') && board[ii][i] == board[ii][i + 1] && board[ii][i] == board[ii][i + 2] && board[ii][i] == board[ii][i + 3] && board[ii][i] == board[ii][i + 4]) {
                console.log('Winner in row')
                return true
            }
        }
    }

    //determine if winner contained within column
    for (var i = 0; i < 6; i++) {
        for (var ii = 0; ii < 5; ii++) {
            if ((board[ii][i] == 'X' || board[ii][i] == 'O') && board[ii][i] == board[ii + 1][i] && board[ii][i] == board[ii + 2][i] && board[ii][i] == board[ii + 3][i] && board[ii][i] == board[ii + 4][i]) {
                console.log('Winner in col')
                return true
            }
        }
    }


    //top left to bottom right
    for (var i = 0; i < 6; i++) {
        for (var ii = 0; ii < 5; ii++) {
            if ((board[ii][i] == 'X' || board[ii][i] == 'O') && board[ii][i] == board[ii + 1][i + 1] && board[ii][i] == board[ii + 2][i + 2] && board[ii][i] == board[ii + 3][i + 3] && board[ii][i] == board[ii + 4][i + 4]) {
                console.log('Winner in top left to bottom right')
                return true
            }
        }
    }

    //bottom left to top right
    try {
        for (var i = 5; i >= 0; i--) {
            for (var ii = 0; ii < 5; ii++) {
                if ((board[i][ii] == 'X' || board[i][ii] == 'O') && board[i][ii] == board[i - 1][ii + 1] && board[i][ii] == board[i - 2][ii + 2] && board[i][ii] == board[i - 3][ii + 3] && board[i][ii] == board[i - 4][ii + 4]) {
                    console.log('Winner in bottom left to bottom right')
                    return true
                }
            }
        }
    } catch (err) {
        return false
    }

    return false

}

// Return the current board state
app.get('/game/state', function(req, res) {

    res.send({
        'board': board,
        'player': names[nameIndex]
    })
    if (nameIndex == 1) {
        nameIndex = -1
    }
    nameIndex = nameIndex + 1
})

    if (nameIndex == 1) {
        nameIndex = -1
    }
    nameIndex = nameIndex + 1

// Return the winner of the game
app.get('/player/winner', function(req, res) {
    if(nameIndex == 1) {
         res.send({
            winner: names[0]
        }) 
    }
    else {
        res.send({
            winner: names[1]
        }) 
    }

})

// Move a position on the board
app.get('/player/move', function(req, res) {
    if (nameIndex == 1) {
        nameIndex = -1
    }
        nameIndex = nameIndex + 1
    if (nameIndex == 0) {
        board[req.query.rowPosition - 1][req.query.colPosition - 1] = 'O'
    } else if (nameIndex == 1) {
        board[req.query.rowPosition - 1][req.query.colPosition - 1] = 'X'
    }

    var isWin = isWinner()
    res.send({
        'board': board,
        'player': names[nameIndex],
        'isWin': isWinner()
    })

})
