var Rook = function(config) {
    this.type = 'rook';
    Piece.call(this, config);
};

Rook.prototype = Object.create(Piece.prototype);

Rook.prototype.moveTo = function(newPosition) {
    const currentX = this.position[0];
    const currentY = this.position[1];
    const newX = newPosition[0];
    const newY = newPosition[1];

    if (newX === currentX || newY === currentY) {
        this.position = newPosition;
        this.render(); 
        console.log(`Rook moved to (${newX}, ${newY})`);
    } else {
        console.log("Invalid move for a rook! It can only move in straight lines.");
    }
};

