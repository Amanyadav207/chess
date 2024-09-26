var Pawn = function(config){
    this.type = 'pawn';
    this.constructor(config);
};

Pawn.prototype = new Piece({});

Pawn.prototype.isValidPosition = function(targetPosition, board){
    // Convert current position to row and column
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    // Calculate the allowed move distance based on pawn color
    let moveDistance = this.color === 'white' ? 1 : -1;
    let initialRow = this.color === 'white' ? 2 : 7;

    // Check if the move is valid
    if (targetPosition.col === currentCol) {
        // Moving straight
        if (targetPosition.row === (currentRow + moveDistance).toString()) {
            // Regular one-square move
            return !board.getPieceAt(targetPosition); // Ensure the target square is empty
        } else if (currentRow === initialRow && targetPosition.row === (currentRow + 2 * moveDistance).toString()) {
            // Initial two-square move
            let intermediatePosition = {col: currentCol, row: (currentRow + moveDistance).toString()};
            return !board.getPieceAt(intermediatePosition) && !board.getPieceAt(targetPosition); // Ensure both squares are empty
        }
    } else if (Math.abs(targetPosition.col.charCodeAt(0) - currentCol.charCodeAt(0)) === 1 &&
               targetPosition.row === (currentRow + moveDistance).toString()) {
        // Diagonal capture
        let targetPiece = board.getPieceAt(targetPosition);
        return targetPiece && targetPiece.color !== this.color; // Ensure there's an enemy piece to capture
    }

    // If none of the above conditions are met, the move is invalid
    console.warn("Invalid move for pawn");
    return false;
}

Pawn.prototype.moveTo = function(targetPosition, board){    
    if(this.isValidPosition(targetPosition, board)){
        const targetPiece = board.getPieceAt(targetPosition);
        if (targetPiece) {
            // Capture the piece
            board.removePiece(targetPiece);
        }
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        return true;
    }else{
        return false;
    }
}