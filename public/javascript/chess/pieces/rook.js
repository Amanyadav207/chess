var Piece = function(config) {
    this.position = config.position || { x: 0, y: 0 };
    this.color = config.color || 'white';
};

Piece.prototype.move = function(newPosition) {
    this.position = newPosition;
};

var Rook = function(config) {
    this.type = 'rook';
    Piece.call(this, config);
};

Rook.prototype = Object.create(Piece.prototype);

Rook.prototype.move = function(newPosition) {
    const currentX = this.position.x;
    const currentY = this.position.y;
    const newX = newPosition.x;
    const newY = newPosition.y;

    if (newX === currentX || newY === currentY) {
        this.position = newPosition;
        console.log(`Rook moved to (${newX}, ${newY})`);
    } else {
        console.log("Invalid move for a rook! It can only move in straight lines.");
    }
};
