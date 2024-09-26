var Rook = function(config) {
    this.type = 'rook';
    this.constructor(config);
};

Rook.prototype = new Piece({});

// Checks if the target position is valid for the Rook
Rook.prototype.isValidPosition = function(targetPosition, board) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    // Rook can only move in straight lines either horizontally or vertically
    if (currentCol === targetCol || currentRow === targetRow) {
        // Check if the path is clear between current and target positions
        return this.isPathClear(targetPosition, board);
    }

    console.warn("Invalid move for rook");
    return false;
}

// Check if the path is clear for the Rook to move
Rook.prototype.isPathClear = function(targetPosition, board) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    let colStep = currentCol === targetCol ? 0 : Math.sign(targetCol.charCodeAt(0) - currentCol.charCodeAt(0));
    let rowStep = currentRow === targetRow ? 0 : Math.sign(targetRow - currentRow);

    // If neither colStep nor rowStep is zero, the move is not valid for a rook
    if (colStep !== 0 && rowStep !== 0) {
        return false;
    }

    let currentColCode = currentCol.charCodeAt(0);
    let currentRowStep = currentRow;

    while (currentColCode !== targetCol.charCodeAt(0) || currentRowStep !== targetRow) {
        currentColCode += colStep;
        currentRowStep += rowStep;

        let intermediatePosition = {
            col: String.fromCharCode(currentColCode),
            row: currentRowStep.toString()
        };

        // If there is a piece in the intermediate position, path is blocked
        if (board.getPieceAt(intermediatePosition)) {
            return false;
        }
    }

    return true;
}

// Move the rook to the target position if the move is valid
Rook.prototype.moveTo = function(targetPosition, board) {
    if (this.isValidPosition(targetPosition, board)) {
        const targetPiece = board.getPieceAt(targetPosition);
        if (targetPiece) {
            // Capture the piece
            board.removePiece(targetPiece);
        }
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        return true;
    } else {
        return false;
    }
}
