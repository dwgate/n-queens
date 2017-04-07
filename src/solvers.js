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
  };

  firstSolution(initRow, initCol);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var storage = 0;
  if (n === 0) { return 1;}

  var findSolutions = function(board, pieceCount) {
    var count = 0;

    var row = pieceCount;
    
    if (pieceCount === n) {
      return 1;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      
      if ( !board.hasAnyRooksConflicts() ) {
        count += findSolutions( board, (pieceCount + 1) );
      } 

      board.togglePiece(row, i);
    }
    return count;
  };


  for (var i = 0; i < n; i++) {
    var initialBoard = new Board({n: n});
    initialBoard.togglePiece(0, i);
    storage += findSolutions(initialBoard, 1);
  }

  console.log('solutions: ' + storage);

  console.log('storage: ' + JSON.stringify(storage));
  return storage;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
    var solutionCount = 0;

    var findSolutions = function(board, pieceCount) {
      var count = 0;

      var row = pieceCount;
      
      if (pieceCount === n) {
        return 1;
      }

      for (var i = 0; i < n; i++) {
        board.togglePiece(row, i);
        
        if ( !board.hasAnyQueensConflicts() ) {
          count += findSolutions( board, (pieceCount + 1) );
        } 

        board.togglePiece(row, i);
      }
      return count;
    };


    for (var i = 0; i < n; i++) {
      var initialBoard = new Board({n: n});
      initialBoard.togglePiece(0, i);
      solutionCount += findSolutions(initialBoard, 1);
    }


  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // return solution;
 
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  if (n === 0) { return 1;}

  var findSolutions = function(board, pieceCount) {
    var count = 0;

    var row = pieceCount;
    
    if (pieceCount === n) {
      return 1;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      
      if ( !board.hasAnyQueensConflicts() ) {
        count += findSolutions( board, (pieceCount + 1) );
      } 

      board.togglePiece(row, i);
    }
    return count;
  };


  for (var i = 0; i < n; i++) {
    var initialBoard = new Board({n: n});
    initialBoard.togglePiece(0, i);
    solutionCount += findSolutions(initialBoard, 1);
  }

  console.log('solutions: ' + solutionCount);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};






    // var successfulBoards = [];
    // if (pieceCount === n) {
    //   arrOfBoards.forEach(function(board) {
    //     //might have to be the arrays that make up the board
    //     console.log('adding: ' + JSON.stringify(board));
    //     solutionCount++;
    //   });
    
    // } else {
    //   arrOfBoards.forEach(function(board) {
    //     var coordinates;
    //     if (successfulBoards.length > 0) {
    //       coordinates = successfulBoards[successfulBoards.length -1].findLatestPiece();
    //     } else {
    //       coordinates = board.findLatestPiece();
    //     }
    //     //add method to board to find most recently placed piece
    //     //col/row start from the most recently placed piece
    //     var row = coordinates[0];
    //     var col = coordinates[1];

    //     for (var i = row; i < n; i++) {
    //       for (var j = col; j < n; j++) {
    //         board.togglePiece(i, j);
    //         debugger;
    //         //these coordinates do'nt iterate through the matrix completely, they will skip
    //         if (board.hasAnyQueensConflicts()) {
    //           board.togglePiece(i, j);
    //         } else {
    //           var success = [];

    //           board.rows().forEach(function(row) {
    //             var x = row.slice(0);
    //             success.push(x);
    //           });

    //           successfulBoards.push( new Board(success) );
    //           board.togglePiece(i, j);
    //         }
    //       }
    //     }
    //   });
    // return findSolutions(successfulBoards, (pieceCount + 1))
    // }


