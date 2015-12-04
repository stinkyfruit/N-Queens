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
  var i;
  //build a new board object
  var board = new Board({n:n});
  //grab rows from board object
  var solution = board.rows();
  //populate board with 1's representing rooks
  //create for for loop and add in rook at a diagonal starting at position 0 of the first row
  for(i = 0; i < solution.length; i++) {
    solution[i][i] = 1;
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  //create a function to calculate factorial
  var factorial = function(n) {
    if (n === 0) {
      return 1;
    }
    return n * factorial(n-1);
  };
  //set solution count to factorial
  solutionCount = factorial(n);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  //return solutionCount
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  var board = new Board({n:n});

  if(n === 0 || n === 2 || n === 3){
    return board.rows();
  }
  var findSolution = function(row, sBoard){
    if(row === n){
      return;
    }
    for(var i = 1; i < n; i++){
      board.togglePiece(row, i);
      if(!board.hasAnyQueensConflicts()){
        sBoard = board.rows();
        findSolution(row + 1, sBoard);
      }
      board.togglePiece(row, i);
    }
    return sBoard;
  };
  solution = findSolution(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  var findSolution = function(row){
    if(row === n){
      solutionCount ++;
      return;
    }

    for(var i = 0; i < n; i++){
      board.togglePiece(row, i);
      if(!board.hasAnyQueensConflicts()){
        findSolution(row + 1);
      }
      board.togglePiece(row, i);
    }
  };
  findSolution(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
