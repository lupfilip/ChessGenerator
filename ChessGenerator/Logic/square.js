class square { //Board square data

    imageList = [null, "../Images/Pawn_white.png", "../Images/Knight_white.png", "../Images/Bishop_white.png", "../Images/Rook_white.png", 
    "../Images/Queen_white.png", "../Images/King_white.png", "../Images/Pawn_black.png", "../Images/Knight_black.png",
     "../Images/Bishop_black.png", "../Images/Rook_black.png", "../Images/Queen_black.png", "../Images/King_black.png"]; //Image list of pieces

    index = -1;
    x = -1;
    y = -1;
    piece = -1;
    image = null;

    constructor(index, piece, boardSize) {

        this.setSquare(index, piece, boardSize); //Set square
    }

    setSquare(index, piece, boardSize) { //Set square data

        this.index = index;
        this.x = index % Math.sqrt(boardSize);
        this.y = Math.floor(index / Math.sqrt(boardSize));
        this.piece = piece;

        if(this.piece > 0) {
            this.image = this.imageList[this.piece - 1]; //Add piece image
        }
        else {
            this.image = null; //Remove piece image
        }
    }
}