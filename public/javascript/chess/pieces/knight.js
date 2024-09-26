var Knight = function(config){
    this.type = 'knight';
    this.constructor(config);
};

Knight.prototype = new Piece({});
Knight.prototype.moveTo = function(newPosition){
    if (this.isValidMove(newPosition)) {
        this.position = newPosition.col + newPosition.row;
        this.render();
        return true;
    }
    return false;
}

Knight.prototype.isValidMove = function(newPosition) {
    var currentCol = this.position.charCodeAt(0) - 65; // Convert A-H to 0-7
    var currentRow = parseInt(this.position[1]) - 1; // Convert 1-8 to 0-7
    var newCol = newPosition.col.charCodeAt(0) - 65;
    var newRow = parseInt(newPosition.row) - 1;

    var colDiff = Math.abs(newCol - currentCol);
    var rowDiff = Math.abs(newRow - currentRow);

    // Knight moves in an L-shape: 2 squares in one direction and 1 in the other
    var isValid = (colDiff === 2 && rowDiff === 1) || (colDiff === 1 && rowDiff === 2);
    if (!isValid) {
        console.log(`Invalid move for Knight from ${this.position} to ${newPosition.col}${newPosition.row}`);
    }

    return isValid;
};

