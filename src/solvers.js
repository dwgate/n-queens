/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = [];
  var initRow = 0;
  var initCol = 0;

  var firstSolution = function(row, col) {
    var board = new Board({n: n});
    var pieceCount = 0;

    for (var i = 0; i < board.get('n'); i++) {
      for (var j = 0; j < board.get('n'); j++) {
        console.log('toggling piece: ' + i + ' ' + j)
        board.togglePiece(i, j);
        pieceCount++;

        if (board.hasAnyRooksConflicts()) {
          board.togglePiece(i, j);
          pieceCount--;
        } else {
          if (pieceCount === n) {
            board.rows().forEach(function(row) {
              solution.push(row);
            });
          }
        }

      }
    }
    if (solution.length === 0) {
      initRow++;
      initCol++;
      firstSolution(initRow, initCol);
    }
  }

  firstSolution(initRow, initCol);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var storage = [];
  var pieceCount = 0;

  //initializes storage with board 
  // var initialBoard = new Board({n: 3});
  // storage.push(initialBoard);

  //create a new board 
    //turn on first piece at 0, 0
    //add board to storage

//function that iterates through storage
  //for every board in storage
function turnOnNext() {
  var holder = [];
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      var newBoard = new Board({n:n});
      newBoard.togglePiece(i, j);
      debugger;
      storage.push(newBoard);
    }
  }
  // storage.forEach(function(board) {  

    //make a new arry for the new moves
      //make a copy of the original board
        //toggle all possible new moves on each different board
        //add copied board into new storage arrary
  //replace old storage with new temporary storage
  //if we haven't added n pieces 
    //return recursive function 
  // });
}
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  console.log('storage: ' + JSON.stringify(storage));
  return storage;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  var initRow = 0;
  var initCol = 0;

  var firstSolution = function(row, col) {
    var board = new Board({n: n});
    var pieceCount = 0;


    for (var i = 0; i < board.get('n'); i++) {
      for (var j = 0; j < board.get('n'); j++) {
        console.log('toggling piece: ' + i + ' ' + j)
        board.togglePiece(i, j);
        pieceCount++;

        if (board.hasAnyQueensConflicts()) {
          board.togglePiece(i, j);
          pieceCount--;
        
        } else {
          if (pieceCount === n) {
            board.rows().forEach(function(row) {
              solution.push(row);
            });
          }
        }
      }
    }
    if (solution.length === 0) {
      initRow++;
      initCol++;
      firstSolution(initRow, initCol);
    }
  };

  firstSolution(initRow, initCol);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


