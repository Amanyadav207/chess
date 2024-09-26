var Queen = function(config) {
    this.type = 'queen';
    this.constructor(config);
};

Queen.prototype = new Piece({});

Queen.prototype.isValidPosition = function(targetPosition) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    let rowDiff = Math.abs(targetRow - currentRow);
    let colDiff = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0));

    if (targetCol === currentCol || targetRow === currentRow) {
        return true;
    }

    if (rowDiff === colDiff) {
        return true;
    }

    console.warn("Invalid move for queen");
    return false;
}

Queen.prototype.moveTo = function(targetPosition) {
    if (this.isValidPosition(targetPosition)) {
        this.position = targetPosition.col + targetPosition.row;
        this.render();
    }
}
