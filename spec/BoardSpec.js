describe('Board', function() {

  var capitalize = function(word) {
    return word[0].toUpperCase() + word.slice(1);
  };


  var verifyConflictTypes = function(expectedConflicts, matrix) {
    // The Board() constructor will accept a matrix and build that into a (Backbone) Board object (as defined in Board.js)
    var board = new Board(matrix);
    _.map('row col rooks majorDiagonal minorDiagonal queens'.split(' '), function(conflictType) {
      var conflictDetected = board['hasAny' + capitalize(conflictType) + 'Conflicts']();
      var conflictExpected = _(expectedConflicts).contains(conflictType);
      var message = conflictExpected ? 'should' : 'should not';

      it(message + ' find a ' + conflictType + ' conflict', function() {
        expect(conflictDetected).to.be.equal(conflictExpected);
      });
    });
  };
  // runs hasAnyRowConflicts, -- write
  // hasAnyColConflicts, -- write
  // hasAnyRooksConflicts, --given, uses functions we write
  // hasAnyMajorDiagonalConflicts, --write
  // hasAnyMinorDiagonalConflicts, --write
  // hasAnyQueensConflicts --given, uses functions we write

  // verifyConlictType takes in all of the expected conflicts(row, rooks, queens) for a given unit test
  // conflictExpected just tests to see which of the methods should be finding conflicts
    // from the list of all the methods(row, col, rook, major diagonal....), the expected are the raguments from expectedConflicts


  // for each conflict type
    // if the conflict type was one of the expected conflicts that got passed in
      // test should be finding a conflict for that type ie rook

  // so basically every unit test below should find conflicts for the first argument list passed to verifyConflictTypes

  // reference the test matrix to see how/what the conflicts are

  //no conflicts duh!
  describe('Empty board', function() {
    verifyConflictTypes([''], [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  //2 pieces in the same row - conflict for either rook or queen
  describe('Board with row conflicts', function() {
    verifyConflictTypes(['row', 'rooks', 'queens'], [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  //2 pieces in the same colum - conflict for either rook or queen
  describe('Board with col conflicts', function() {
    verifyConflictTypes(['col', 'rooks', 'queens'], [
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  describe('Board with major diagonal conflicts', function() {
    //major diagonal, topL to botR - conflict for queens not rooks
    verifyConflictTypes(['majorDiagonal', 'queens'], [
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);

    // same as prev, diagonal tests for the entire diagonal
    // as do all row/col/diagonal - tests for conflict in the entire row not just
    // the immediate surroundings
    verifyConflictTypes(['majorDiagonal', 'queens'], [
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 1, 0]
    ]);
  });
  //minor diagonal is opposite diagonal of major, again - checks the entire row
  describe('Board with minor diagonal conflicts', function() {
    verifyConflictTypes(['minorDiagonal', 'queens'], [
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ]);

    verifyConflictTypes(['minorDiagonal', 'queens'], [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0]
    ]);
  });
});
