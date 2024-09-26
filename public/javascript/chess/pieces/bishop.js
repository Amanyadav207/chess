var Bishop = function (config) {
    this.type = "bishop";
    this.constructor(config);
  };
  
  Bishop.prototype = new Piece({});
  
  Bishop.prototype.validateMove = function (targetPosition, board) {
    const curRow = this.position.charCodeAt(1) - 0;
    const curCol = this.position.charCodeAt(0) - 64;
    const tarRow = targetPosition.row.charCodeAt(0) - 0;
    const tarCol = targetPosition.col.charCodeAt(0) - 64;
  
    const rowDiff = Math.abs(tarRow - curRow);
    const colDiff = Math.abs(tarCol - curCol);
  
    if (rowDiff !== colDiff) {
      return false;
    }
  
    if (!this.isPathClear(curRow, curCol, tarRow, tarCol, board)) {
      return false;
    }
  
    return true;
  };
  
  Bishop.prototype.isPathClear = function (curRow, curCol, tarRow, tarCol, board) {
    const rowStep = curRow < tarRow ? 1 : -1;
    const colStep = curCol < tarCol ? 1 : -1;
  
    let row = curRow + rowStep;
    let col = curCol + colStep;
  
    while (row !== tarRow && col !== tarCol) {
      if (
        board.getPieceAt({
          row: String.fromCharCode(0 + row),
          col: String.fromCharCode(64 + col),
        })
      ) {
        return false;
      }
  
      row += rowStep;
      col += colStep;
    }
  
    return true;
  };
  
  Bishop.prototype.moveTo = function(targetPosition, board) {    
    if (this.validateMove(targetPosition, board)) {
        this.position = targetPosition.col + targetPosition.row;
        console.log("HIi", targetPosition);
        
        this.render();
    }
};