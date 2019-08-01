const request = require('request');
var assert = require('assert');

var express = require('express')
var app = express()
// port = process.env.PORT || 3000;

// var objpost = { name: "post", age: 30, city: "New York" };
// var objget = { name1 : { name: "get", age: 30, city: "New York", dt : '21 1 2019'} , name2 : { name: "get", age: 30, city: "New York", dt : '19 1 2019'} , name3 : { name: "get", age: 30, city: "New York", dt : '17 1 2019'}, name4 : { name: "get", age: 30, city: "New York", dt : '18 01 2019'} };

app.listen(3000);

names = []
var index = -1

function getName() {
    index = index + 1
    return names[index]
}

app.get('/player/status', function(req, res) {
    res.send({
        numberplayers: names.length
    })
})

app.get('/player/connect', function(req, res) {

    var nameValue = getName();

    var player = {
        name: nameValue
    };
    console.log('Player ' + nameValue + ' connected')
    res.send(player)
})

app.get('/player/add', function(req, res) {

    index = index + 1
    names[index] = [req.query.playername]

    res.send({
        playerName: req.query.player1name
    })
})

app.get('/game/reset', function(req, res) {
    names = []
    resetBoard()
    index = -1
    console.log('Board reset')
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


function tests() {

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

    resetBoard()
    // Testing this board : is valid so should return true
 // [[ ' ', ' ', ' ', ' ', ' ', 'O', ' ', ' ', ' ' ],
 //  [ ' ', ' ', ' ', ' ', 'O', ' ', ' ', ' ', ' ' ],
 //  [ ' ', ' ', ' ', 'O', ' ', ' ', ' ', ' ', ' ' ],
 //  [ ' ', ' ', 'O', ' ', ' ', ' ', ' ', ' ', ' ' ],
 //  [ ' ', 'O', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
 //  [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ]]
    board[4][1] = 'O'
    board[3][2] = 'O'
    board[2][3] = 'O'
    board[1][4] = 'O'
    board[0][5] = 'O'
    assert(isWinner() == true)

}

tests() 

 

function isWinner() {

    console.log('board is' , board)

    //Determine if winner contained within row
    for (var i = 0; i < 6; i++) {
        for (var ii = 0; ii < 6; ii++) {
        //  console.log(ii , i)
            if ((board[ii][i] == 'X' || board[ii][i] == 'O') && board[ii][i] == board[ii][i + 1] && board[ii][i] == board[ii][i + 2] && board[ii][i] == board[ii][i + 3] && board[ii][i] == board[ii][i + 4]) {
                return true
            }
        }
    }

    //Determine if winner contained within column    
    for (var i = 0; i < 6; i++) {
        for (var ii = 0; ii < 5; ii++) {
          //console.log(ii , i)
            if ((board[ii][i] == 'X' || board[ii][i] == 'O') && board[ii][i] == board[ii + 1][i] && board[ii][i] == board[ii + 2][i] && board[ii][i] == board[ii + 3][i] && board[ii][i] == board[ii][i]) {
                return true
            }
        }
    }


    //Top left to bottom right
    for (var i = 0; i < 6; i++) {
        for (var ii = 0; ii < 5; ii++) {
          //  console.log(ii , i)
            if ((board[ii][i] == 'X' || board[ii][i] == 'O') && board[ii][i] == board[ii + 1][i + 1] && board[ii][i] == board[ii + 2][i + 2] && board[ii][i] == board[ii + 3][i + 3] && board[ii][i] == board[ii + 4][i + 4]) {
                return true
            }
        }
    }

// bottom left to top right
try {
    for (var i = 5; i >= 0; i--) {
        for (var ii = 0; ii < 5; ii++) {
            // console.log('here'+i-4)
            // console.log('here'+ii+4)
           // console.log(board[i - 4][ii + 4])
            if ( (board[i][ii] == 'X' || board[i][ii] == 'O') && board[i][ii] == board[i - 1][ii + 1] && board[i][ii] == board[i - 2][ii + 2] && board[i][ii] == board[i - 3][ii + 3] && board[i][ii] == board[i - 4][ii + 4]) {
                
                return true
            }
        }
    }
    }
catch(err) {
  return false
}

    return false

}

nameIndex = -1

app.get('/game/state', function(req, res) {
    console.log('Game state')
    nameIndex = nameIndex + 1
    res.send({
        'board': board,
        'player': names[nameIndex]
    })
    if(nameIndex == 1) {
      nameIndex = -1
    }
})

app.get('/player/winner', function(req, res) {
  console.log('/winner' + names[nameIndex])
      if(nameIndex == -1) {
      nameIndex = nameIndex + 1
    }
  res.send( {winner : names[nameIndex]} )
})

// movedindex = -1
app.get('/player/move', function(req, res) {

    nameIndex = nameIndex + 1

    if(nameIndex == 0){
      board[req.query.rowPosition-1][req.query.colPosition-1] = 'O'
    }
    else if (nameIndex == 1){
       board[req.query.rowPosition-1][req.query.colPosition-1] = 'X'
    }

    var isWin = isWinner()
    res.send({
        'board': board,
        'player': names[nameIndex],
        'isWin' : isWinner()
    })
    if(nameIndex == 1) {
      console.log('resetting')
      nameIndex = -1
    }

})

app.post('/testpost', function(req, res) {
    res.send(objpost)
})

app.use('/', express.static(__dirname + '/'));

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});