// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },
    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    hasRowConflictAt: function(rowIndex) {
      var content = 0;

      for (var i = 0; i < this.get(rowIndex).length; i++) {
        if (this.get(rowIndex)[i] !== 0) {
          content ++;
        }
      }

      return (content > 1) ? true : false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var length = this.get('n');

      for (var i = 0; i < length; i++) {
        if (this.hasRowConflictAt(i) ) {
          return true;
        }
      }

      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var rows = this.get('n');
      var content = 0;

      for (var i = 0; i < rows; i++) {
        if (this.get(i)[colIndex] === 1) {
          content++;
        }
      }

      return content > 1 ? true : false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var rows = this.get('n');
      var conflicts = 0;

      for (var i = 0; i < rows; i++) {
        if( this.hasColConflictAt(i) ) {
          conflicts++;
        }
      }

      return conflicts > 0 ? true : false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var column = majorDiagonalColumnIndexAtFirstRow;
      var counter = 0;

      for (var row = 0; row < this.get('n'); row++) {
        if (this._isInBounds(row, column) && this.get(row)[column] !== 0) {
          counter++;
        }
        column = column + 1;
      }

      return counter > 1 ? true : false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      for (var i = (0 - (this.get('n') -1)); i < this.get('n'); i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }

      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var column = minorDiagonalColumnIndexAtFirstRow;
      var counter = 0;

      for (var row = 0; row < this.get('n') + 1; row ++) {
        if (this._isInBounds(row, column) && this.get(row)[column] !== 0) {
          counter++;
        }
        column = column - 1;
      }

      return counter > 1 ? true : false;
    },

    findLatestPiece: function() {
      for (var i = (this.get('n') - 1); i >= 0; i--) {
        for (var j = (this.get('n') -1); j >= 0; j--) {
          if (this.get(i)[j] === 1) {
            return [i, j];
          }
        }
      }
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      for (var i = 0; i < ( this.get('n') * 2 ); i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      
      return false;
    }
    /*--------------------  End of Helper Functions  ---------------------*/


  });
  

  // what is this for..?
  //only called by the backbone to make the board i think
  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());




// _getFirstRowColumnIndexForMinorDiagonalOn and _getFirstRowColumnIndexForMajorDiagonalOn
  //takes row and column indexes
  //returns a single number from where to start the diagonal conflict search

// _isInBounds 
  //takes row/col indexes
  //returns a single number from where to start the diagonal conflict search


// hasAnyColConflicts
  // returns true or false if there are ANY column conflicts

//hasAnyMajorDiagonalConflicts and hasAnyMinorDiagonalConflics
  // returns true or false if ther are ANY diagonal conflicts

//hasAnyQueenConflictsOn
  // takes row/column indexes 
  //checks if there are row/col/diagonal
  //checks if there are major or minor diagonal conflicts from current location

//hasAnyQueenConflicts
  //checks minor/major diagonal conflicts
  //checks rook conflicts

// hasAnyRookConflicts
  //no arguments
  //checks row and col conflicts

// hasAnyRowConflicts
  // checks ANY row conflicts 

// hasAnyColConflictAt
  //takes column index
  //checks for conflicts from index?

//hasMajor/MinorDiagonsConflictAt
  //takes a integer to begin diagonal search from for a specific row

//hasRoConflictAt
  //checks conflict for a given row

// rows
  //returns an array of rows 
