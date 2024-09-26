var King = function(config){
    this.type = 'king';
    this.constructor(config);
};

King.prototype = new Piece({});

King.prototype.isValidPosition = function(targetPosition){
    // Convert current position to row and column
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    // Calculate the difference between current and target positions
    let colDiff = Math.abs(targetPosition.col.charCodeAt(0) - currentCol.charCodeAt(0));
    let rowDiff = Math.abs(parseInt(targetPosition.row) - currentRow);

    // King can move one square in any direction (horizontal, vertical, or diagonal)
    if ((colDiff === 1 && rowDiff === 0) ||  // Horizontal
        (colDiff === 0 && rowDiff === 1) ||  // Vertical
        (colDiff === 1 && rowDiff === 1)) {  // Diagonal
        return true;
    }

    // If none of the above conditions are met, the move is invalid
    console.warn("Invalid move for king");
    return false;
}

King.prototype.moveTo = function(targetPosition){    
    if(this.isValidPosition(targetPosition)){
        this.position = targetPosition.col + targetPosition.row;
        this.render();
    }else{
        //NOOP
    }
}

King.prototype.canCapture = function(targetPiece, board){
    // Check if the target position is valid for the king
    if (!this.isValidPosition(targetPiece.position)) {
        return false;
    }

    // Check if the target piece is of the opposite color
    return this.color !== targetPiece.color;
}

King.prototype.isInCheckmate = function(board){
    // Get all possible moves for the king
    let possibleMoves = this.getAllPossibleMoves();

    // Check if any of the possible moves are safe
    for (let move of possibleMoves) {
        if (this.isSafeMove(move, board)) {
            return false; // If there's at least one safe move, it's not checkmate
        }
    }

    // If we're here, the king has no safe moves
    return true;
}

King.prototype.getAllPossibleMoves = function(){
    let moves = [];
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    // Generate all adjacent squares
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue; // Skip the current position
            
            let newCol = String.fromCharCode(currentCol.charCodeAt(0) + i);
            let newRow = currentRow + j;
            
            // Check if the new position is on the board
            if (newCol >= 'a' && newCol <= 'h' && newRow >= 1 && newRow <= 8) {
                moves.push({col: newCol, row: newRow.toString()});
            }
        }
    }

    return moves;
}

