var chessboard = []; //Chessboard variable for functionality
var pieceCount = [8, 2, 2, 2, 1, 1, 8, 2, 2, 2, 1, 1]; //Number of each piece (order written in square)
var pieceName = ["White Pawn", "White Knight", "White Bishop", "White Rook", "White Queen", "White King",
"Black Pawn", "Black Knight", "Black Bishop", "Black Rook", "Black Queen", "Black King"];

var onTurn = 0;
var castling = [0, 0, 0, 0];

var enPassant = null;

var drawMoves = 0;
var playerMoves = 1;

var colorCount = [0, 0];

function placePawn(color) { //Place a pawn of selected color

    var placingIndex;

    do { //Choose index
        placingIndex = Math.floor(Math.random() * chessboard.length) % 24 + 8 + 24 * !color;

        for(var i = 0; i <= Math.sqrt(chessboard.length); i++) {
            if(i == Math.sqrt(chessboard.length)) {i = -1;}
            else if(!chessboard.some(data => data.piece == 1 + 6 * color && data.x == i)) {
                if(Math.random() * chessboard.length < chessboard.length / 2) {continue;}
                else {
                    placingIndex -= placingIndex % 8;
                    placingIndex += i;
                    break;
                }
            }
        }
    } while(chessboard.some(data => data.index === chessboard[placingIndex].index && data.piece !== 0)); //If index is occupied

    chessboard[placingIndex].piece = 1 + (pieceCount.length / 2) * color; //Place pawn

    chessboard[placingIndex].image = chessboard[placingIndex].imageList[chessboard[placingIndex].piece];

    if(chessboard[placingIndex].y === 3 + color) { //If on middle rows

        if(Math.floor(Math.random() * Math.sqrt(chessboard.length) === 0)) { //If chosen to make en Passant
            enPassant = chessboard[placingIndex]; //Set en Passant
        }
        else {
            enPassant = null;
        }
    }
}

function placeKnight(color) { //Place a pawn of selected color

    var placingIndex;

    do { //Choose index
        placingIndex = Math.floor(Math.random() * chessboard.length) % 32 + 32 * !color;
    } while(chessboard.some(data => data.index === chessboard[placingIndex].index && data.piece !== 0)); //If index is occupied

    chessboard[placingIndex].piece = 2 + (pieceCount.length / 2) * color; //Place knight

    chessboard[placingIndex].image = chessboard[placingIndex].imageList[chessboard[placingIndex].piece];
}

function placeBishop(color) { //Place a pawn of selected color

    var placingIndex;

    var bishopCount = chessboard.filter(data => data.piece === 3 + (pieceCount.length / 2) * color).length;

    do { //Choose index

        if(bishopCount > 1) {
            placingIndex = Math.floor(Math.random() * chessboard.length) % 32 + 32 * !color;       }
        else {

            do {
                placingIndex = Math.floor(Math.random() * chessboard.length) % 32 + 32 * !color;
            } while((chessboard[placingIndex].x + chessboard[placingIndex].y) % 2 !== bishopCount); //Repeat until match
        }

    } while(chessboard.some(data => data.index === chessboard[placingIndex].index && data.piece !== 0)); //If index is occupied

    chessboard[placingIndex].piece = 3 + (pieceCount.length / 2) * color; //Place Bishop

    chessboard[placingIndex].image = chessboard[placingIndex].imageList[chessboard[placingIndex].piece];
}

function placeRook(color) { //Place a pawn of selected color

    var placingIndex;

    do { //Choose index
            placingIndex = Math.floor(Math.random() * chessboard.length) % 32 + 32 * !color; //Choose index on board

    } while(chessboard.some(data => data.index === chessboard[placingIndex].index && data.piece !== 0)); //If index is occupied

    chessboard[placingIndex].piece = 4 + (pieceCount.length / 2) * color; //Place Bishop

    chessboard[placingIndex].image = chessboard[placingIndex].imageList[chessboard[placingIndex].piece];
}

function placeQueen(color) { //Place a pawn of selected color

    var placingIndex;

    do { //Choose index
            placingIndex = Math.floor(Math.random() * chessboard.length) % 32 + 32 * !color; //Choose index on board

    } while(chessboard.some(data => data.index === chessboard[placingIndex].index && data.piece !== 0)); //If index is occupied

    chessboard[placingIndex].piece = 5 + (pieceCount.length / 2) * color; //Place Bishop

    chessboard[placingIndex].image = chessboard[placingIndex].imageList[chessboard[placingIndex].piece];
}

function placeKing(color) { //Place a pawn of selected color

    var placingIndex;

    do { //Choose index
            placingIndex = Math.floor(Math.random() * chessboard.length) % 32 + 32 * !color; //Choose index on board

    } while(chessboard.some(data => data.index === chessboard[placingIndex].index && data.piece !== 0)); //If index is occupied

    chessboard[placingIndex].piece = 6 + (pieceCount.length / 2) * color; //Place Bishop

    chessboard[placingIndex].image = chessboard[placingIndex].imageList[chessboard[placingIndex].piece];
}

function placePiece(piece, color) { //Place specific piece

    switch(piece) { //Check piece type
        case 0:
            placePawn(color);
            break;
        case 1:
            placeKnight(color);
            break;
        case 2:
            placeBishop(color);
            break;
        case 3:
            placeRook(color);
            break;
        case 4:
            placeQueen(color);
            break;
        case 5:
            placeKing(color);
            break;
        default:
            break;
    }
}

function placePieces() { //Place all pieces on board

    var pieceValue = [1, 3, 3, 5, 9, 0]

    for(var i = 0; i < chessboard.length; i++) { //Set each tile blank

        chessboard[i].piece = 0;
        chessboard[i].image = chessboard[i].imageList[chessboard[i].piece];
    }

    var place = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //Number of pieces that will be placed
    colorCount = [0, 0];
    var sum = [0, 0];

    var num = Math.floor(Math.random() * 8);
    var maxP = num + 1; // N + 1

    do {
        place = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //Number of pieces that will be placed
        colorCount = [0, 0];
        sum = [0, 0];

        for(var i = 0; i < place.length; i++) { //For each piece group
            if(i % 6 === 0) {
                place[i] = (Math.floor(Math.random() * (pieceCount[i] + 1) - Math.random() * (pieceCount[i] / 2)) % pieceCount[i]);

                colorCount[Math.floor(i / 6)] += place[i];
            }
            else if(maxP == 0) {continue;}
            else if(i % 6 !== 5) {

                place[i] = (Math.floor(Math.random() * (pieceCount[i] + 1)) % maxP);

                colorCount[Math.floor(i / 6)] += place[i];
                maxP -= place[i];
            }
            else {
                place[i] = 1;

                colorCount[Math.floor(i / 6)] += place[i];
                maxP = num + 1;
            }

            sum[Math.floor(i / 6)] += pieceValue[i % 6] * place[i];
        }
    } while(Math.abs(sum[0] - sum[1]) > Math.floor(Math.random() * Math.min(Math.floor(Math.random() * 40), num)))

    enPassant = null;

    for(var i = 0; i < place.length / 2; i++) { //Each piece type
        for(var j = 0; j < 2; j++) { //Each color
            for(var k = 0; k < place[i + (place.length / 2) * j]; k++) { //Number of pieces

                switch(j) { //Check color
                    case 0:
                        placePiece(i, j); //Place white piece
                        break;
                    case 1:
                        placePiece(i, j); //Place black piece
                    default:
                        break;
                }
            }
        }
    }
}

function placePiecesManual(place) { //Place all pieces on board

    for(var i = 0; i < chessboard.length; i++) { //Set each tile blank

        chessboard[i].piece = 0;
        chessboard[i].image = chessboard[i].imageList[chessboard[i].piece];
    }

    for(var i = 0; i < place.length / 2; i++) { //Each piece type
        for(var j = 0; j < 2; j++) { //Each color
            for(var k = 0; k < place[i + (place.length / 2) * j]; k++) { //Number of pieces

                switch(j) { //Check color
                    case 0:
                        placePiece(i, j); //Place white piece
                        break;
                    case 1:
                        placePiece(i, j); //Place black piece
                    default:
                        break;
                }
            }
        }
    }
}

function updateBoard() { //Update visible board

    for(var i = 0; i < chessboard.length; i++) { //For each square

        if(chessboard[i].piece > 0) { //If square has a piece
            document.getElementById("" + chessboard[i].index).innerHTML = "<img src='" + chessboard[i].image + "' alt='piece' style='width: 100%; height: 100%' />"; //Place image
        }
        else {
            document.getElementById("" + chessboard[i].index).innerHTML = ""; //Clear image
        }
    }
}

function getFEN() { //Get position FEN of the board

    var symbol = [null, "P", "N", "B", "R", "Q", "K", "p", "n", "b", "r", "q", "k"];
    var castlingSymbol = ["K", "Q", "k", "q"];
    var turnSymbol = ["w", "b"];
    var text = "";

    var count = 0;

    for(var i = 0; i < chessboard.length; i++) { //Each tile

        if(chessboard[i].piece > 0) {
            if(count > 0) {
                text += count;
                count = 0;
            }

            text += symbol[chessboard[i].piece];
        }
        else {
            count++;
        }

        if(i % Math.sqrt(chessboard.length) === Math.sqrt(chessboard.length) - 1) {
            if(count > 0) {
                text += count;
                count = 0;
            }

            if(i !== chessboard.length - 1) {
                text += "/";
            }
        }
    }

    text += " " + turnSymbol[onTurn];

    if(castling.every(data => data === 0)) { //If no castling
        text += " -"
    }
    else {
        text += " " + castlingSymbol[castling[0]] + castlingSymbol[castling[1]] + castlingSymbol[castling[2]] + castlingSymbol[castling[3]];
    }

    if(enPassant !== null) { //If en passant set
        text += " " + enPassant.x + enPassant.y;
    }
    else {
        text += " -"
    }

    text += " " + 0;

    text += " " + 1;

    return text;
}

function hasKing(onTurn) {
    var kingIndex = chessboard.findIndex(data => data.piece === 6 * (onTurn + 1)); //Get king index

    if(kingIndex < 0) { //If king does not exist
        return false;
    }

    return true;
}

function notInvalid(onTurn) {

    var kingIndex = chessboard.findIndex(data => data.piece === 6 * (onTurn + 1)); //Get king index

    if(kingIndex < 0) { //If king does not exist
        return false;
    }

    var horizontal = chessboard.filter(data => data.y === chessboard[kingIndex].y); //Get horizontal pieces
    var vertical = chessboard.filter(data => data.x === chessboard[kingIndex].x); // Get vertical pieces
    var diagonalLR = chessboard.filter(data => data.x - chessboard[kingIndex].x === data.y - chessboard[kingIndex].y); //Get diagonal pieces
    var diagonalRL = chessboard.filter(data => data.x - chessboard[kingIndex].x === chessboard[kingIndex].y - data.y); //Get other diagonal pieces
    var knightJumps = [];

    for(var i = 1; i <= 2; i++) { //Get knight hop pieces

        if(kingIndex - Math.abs(i - 3) - i * Math.sqrt(chessboard.length) < 0 || kingIndex - Math.abs(i - 3) - i * Math.sqrt(chessboard.length) >= chessboard.length) {

        }
        else if(chessboard[kingIndex - Math.abs(i - 3) - i * Math.sqrt(chessboard.length)].piece > 0) { //If piece is
            knightJumps.push(chessboard[kingIndex - Math.abs(i - 3) - i * Math.sqrt(chessboard.length)])
        }

        if(kingIndex + Math.abs(i - 3) - i * Math.sqrt(chessboard.length) < 0 || kingIndex + Math.abs(i - 3) - i * Math.sqrt(chessboard.length) >= chessboard.length) {

        }
        else if(chessboard[kingIndex + Math.abs(i - 3) - i * Math.sqrt(chessboard.length)].piece > 0) { //If piece is
            knightJumps.push(chessboard[kingIndex + Math.abs(i - 3) - i * Math.sqrt(chessboard.length)])
        }

        if(kingIndex - Math.abs(i - 3) + i * Math.sqrt(chessboard.length) < 0 || kingIndex - Math.abs(i - 3) + i * Math.sqrt(chessboard.length) >= chessboard.length) {

        }
        else if(chessboard[kingIndex - Math.abs(i - 3) + i * Math.sqrt(chessboard.length)].piece > 0) { //If piece is
            knightJumps.push(chessboard[kingIndex - Math.abs(i - 3) + i * Math.sqrt(chessboard.length)])
        }

        if(kingIndex + Math.abs(i - 3) + i * Math.sqrt(chessboard.length) < 0 || kingIndex + Math.abs(i - 3) + i * Math.sqrt(chessboard.length) >= chessboard.length) {

        }
        else if(chessboard[kingIndex + Math.abs(i - 3) + i * Math.sqrt(chessboard.length)].piece > 0) { //If piece is
            knightJumps.push(chessboard[kingIndex + Math.abs(i - 3) + i * Math.sqrt(chessboard.length)])
        }
    }

    var pawnChain = chessboard.filter(data => ((chessboard[kingIndex].x - 1 === data.x ||
        chessboard[kingIndex].x + 1 === data.x) && data.y === chessboard[kingIndex].y + 1 * (1 - 2 * onTurn)));

    var serach = [
        horizontal.filter(data => (data.piece === 4 + 6 * Math.abs(onTurn - 1) || data.piece === 5 + 6 * Math.abs(onTurn - 1)) &&
            ((data.x < chessboard[kingIndex].x && !horizontal.some(data2 => data2.piece > 0 && data2.piece % 6 !== 0 && data2.x > data.x && data2.x < chessboard[kingIndex].x)) ||
            (data.x > chessboard[kingIndex].x && !horizontal.some(data2 => data2.piece > 0 && data2.piece % 6 !== 0 && data2.x < data.x  && data2.x > chessboard[kingIndex].x)))).length,
    
        vertical.filter(data => (data.piece === 4 + 6 * Math.abs(onTurn - 1) || data.piece === 5 + 6 * Math.abs(onTurn - 1)) &&
            ((data.y < chessboard[kingIndex].y && !vertical.some(data2 => data2.piece > 0 && data2.piece % 6 !== 0 && data2.y > data.y && data2.y < chessboard[kingIndex].x)) ||
            (data.y > chessboard[kingIndex].y && !vertical.some(data2 => data2.piece > 0 && data2.piece % 6 !== 0 && data2.y < data.y  && data2.y > chessboard[kingIndex].x)))).length,

        diagonalLR.filter(data => (data.piece === 3 + 6 * Math.abs(onTurn - 1) || data.piece === 5 + 6 * Math.abs(onTurn - 1)) &&
            ((data.x < chessboard[kingIndex].x && !diagonalLR.some(data2 => data2.piece > 0 && data2.piece % 6 !== 0 && data2.x > data.x && data2.x < chessboard[kingIndex].x)) ||
            (data.x > chessboard[kingIndex].x && !diagonalLR.some(data2 => data2.piece > 0 && data2.piece % 6 !== 0 && data2.x < data.x  && data2.x > chessboard[kingIndex].x)))).length,
    
        diagonalRL.filter(data => (data.piece === 3 + 6 * Math.abs(onTurn - 1) || data.piece === 5 + 6 * Math.abs(onTurn - 1)) &&
            ((data.y < chessboard[kingIndex].y && !diagonalRL.some(data2 => data2.piece > 0 && data2.piece % 6 !== 0 && data2.y > data.y && data2.y < chessboard[kingIndex].x)) ||
            (data.y > chessboard[kingIndex].y && !diagonalRL.some(data2 => data2.piece > 0 && data2.piece % 6 !== 0 && data2.y < data.y  && data2.y > chessboard[kingIndex].x)))).length,

        knightJumps.filter(data => data.piece === 2 + 6 * Math.abs(onTurn - 1) &&
            ((Math.abs(data.y - chessboard[kingIndex].y) === 2 && Math.abs(data.x - chessboard[kingIndex].x) === 1) || 
            (Math.abs(data.y - chessboard[kingIndex].y) === 1 && Math.abs(data.x - chessboard[kingIndex].x) === 2))).length,

        pawnChain.filter(data => data.piece === 1 + 6 * Math.abs(onTurn - 1) && data.y - 1 * (1 - 2 * onTurn) === chessboard[kingIndex].y &&
            Math.abs(data.x - chessboard[kingIndex].x) === 1).length,

        chessboard.filter(data => data.piece === 6 * (Math.abs(onTurn - 1) + 1) && 
            (Math.abs(data.x - chessboard[kingIndex].x) <= 1 && Math.abs(data.y - chessboard[kingIndex].y)) <= 1).length
    ];

    var found = 0;

    for(var i = 0; i < serach.length; i++) {
        if(serach[i] > 0) { //Invalid position
            found++;

            if((globalThis.onTurn === onTurn && (serach[i] > 1 || found > 1)) || globalThis.onTurn !== onTurn) {
                return false;
            }
        }
    }

    return true;

}

function createPosition() { //Creates a position
    var fen = "";

    onTurn = Math.floor(Math.random() * 2);

    do {
        placePieces();
    } while(!notInvalid(Math.abs(onTurn - 1)) || !notInvalid(onTurn));

    for(var i = 0; i < 2; i++) { //Each king
        if(chessboard[chessboard.length - Math.abs(chessboard.length * i - 5)].piece === 6 * (i+1)) {
            if(chessboard[chessboard.length - Math.abs(chessboard.length * i - 1)].piece === 4 + 6 * i) {
                castling[0 + 2 * i] = 1;
            }
            else {
                castling[0 + 2 * i] = 0;
            }

            if(chessboard[chessboard.length - Math.abs(chessboard.length * i - 8)].piece === 4 + 6 * i) {
                castling[1 + 2 * i] = 1;
            }
            else {
                castling[1 + 2 * i] = 0;
            }
        }
    }

    updateBoard();

    fen += getFEN();

    return fen;
}

function createPositionManual(place) { //Creates a position
    var fen = "";

    onTurn = Math.floor(Math.random() * 2);

    do {
        placePiecesManual(place);
    } while((!notInvalid(Math.abs(onTurn - 1)) && hasKing(Math.abs(onTurn - 1))) || (!notInvalid(onTurn) && hasKing(onTurn)));

    if(hasKing(Math.abs(onTurn - 1)) && hasKing(onTurn))
        console.log("legal");
    else if(hasKing(Math.abs(onTurn - 1)))
        onTurn = Math.abs(onTurn - 1);

    for(var i = 0; i < 2; i++) { //Each king
        if(chessboard[chessboard.length - Math.abs(chessboard.length * i - 5)].piece === 6 * (i+1)) {
            if(chessboard[chessboard.length - Math.abs(chessboard.length * i - 1)].piece === 4 + 6 * i) {
                castling[0 + 2 * i] = 1;
            }
            else {
                castling[0 + 2 * i] = 0;
            }

            if(chessboard[chessboard.length - Math.abs(chessboard.length * i - 8)].piece === 4 + 6 * i) {
                castling[1 + 2 * i] = 1;
            }
            else {
                castling[1 + 2 * i] = 0;
            }
        }
    }

    updateBoard();

    fen += getFEN();

    return fen;
}

function createBoard(size) { //Creates board tiles

    var board = document.getElementById("chessboard"); //save chessboard to variable

    for(var i = size; i >= 0; i--) { //Row tile
        for(var j = 0; j < size + 1; j++) { //Column tile
            if(i < 1) {
                if(j > 0) {
                    board.innerHTML += "<div class='tile row'><p>" + (j) + "<p></div>"; //Fill row with index
                }
                else {
                    board.innerHTML += "<div class='tile column'></div>"; //Fill column void
                }
            } else if(j < 1) {
                board.innerHTML += "<div class='tile column'><p>" + (i) + "</p></div>"; //Fill column with index
            }
            else {
                chessboard.push(new square((j - 1) + (i - 1) * (size), 0, Math.pow(size, 2))); //Set square

                if((i+j) % 2 === 0) {
                    board.innerHTML += "<div class='tile black' id='" + chessboard[chessboard.length - 1].index + "'></div>"; //Fill with tile
                } else {
                    board.innerHTML += "<div class='tile white' id='" + chessboard[chessboard.length - 1].index + "'></div>"; //Fill with tile
                }
            }
        }
    }

    var allElements = document.getElementsByClassName("tile"); //Gte board tiles

    var fill = ((100 - size - (1 / size)) / size); //Get size
    var border = (size / ((100 - size - (1 / size)) / size * 2)); //Get blank space between

    for(var i = 0; i < allElements.length; i++) {
        allElements[i].style.width = fill + "%";
        allElements[i].style.height = fill + "%";
        allElements[i].style.margin = border + "%";
    }

    allElements = document.getElementsByClassName("row"); //Get row indexes

    for(var i = 0; i < allElements.length; i++) {
        allElements[i].style.width = fill + "%";
        allElements[i].style.height = "1%";
        allElements[i].style.margin = border + "%";
    }

    allElements = document.getElementsByClassName("column"); //Get column indexes

    for(var i = 0; i < allElements.length; i++) {
        allElements[i].style.width = "1%";
        allElements[i].style.height = fill + "%";
        allElements[i].style.margin = border + "%";
    }

    document.getElementById("fen").innerHTML = createPosition(); //board FEN
}

window.onload = function() { //When website loads

    var button = document.getElementById("generate"); //Save button

    createBoard(8); //Create a board of specific size

    button.onclick = function() { //If button clicked
        if(document.getElementById("manual").checked) {
            var place = Array();
            for(var i = 0; i < 12; i++) {
                var input = document.getElementsByClassName("number")[i];
                if(isNaN(parseInt(input.value))) place.push(0);
                if(parseInt(input.value) > parseInt(input.max)) place.push(parseInt(input.max));
                else place.push(parseInt(input.value));
            }
            if(place.slice(0, 5).reduce((sum, value) => sum + value, 0) > 32) { alert("Too many white pieces!"); return;}
            if(place.slice(6, 11).reduce((sum, value) => sum + value, 0) > 32) { alert("Too many black pieces!"); return;}
            document.getElementById("fen").innerHTML = createPositionManual(place);
        }
        else {
            document.getElementById("fen").innerHTML = createPosition();
        }
    }

    var pieces = document.getElementsByClassName("number");
    var limit = [8, 10, 10, 10, 9, 1];
    
    for(var i = 0; i < pieces.length; i++) {
        pieces[i].id = i;
        pieces[i].onclick = function() {
            var valueP = 0;
            for(var j = 1; j < 5; j++) {
                if(parseInt(this.id) % 6 == j) continue;
                if(parseInt(pieces[Math.floor(parseInt(this.id) / 6) * 6 + j].value) + 8 - limit[j] > 0)
                    valueP += parseInt(pieces[Math.floor(parseInt(this.id) / 6) * 6 + j].value) + 8 - limit[j];
            }
            
            if(parseInt(this.value) + valueP * (parseInt(this.id) % 6 != 5) < limit[parseInt(this.id) % 6] - 
                parseInt(pieces[Math.floor(parseInt(this.id) / 6) * 6].value) * (parseInt(this.id) % 6 != 0 && parseInt(this.id) % 6 != 5))
                this.value = parseInt(this.value) + 1;
            else 
                this.value = 0;
        }
    }

}

/*Console code*/
/*
var list = []; for(var i=0; i < 1000; i++) {
    document.getElementById('generate').click();
    list.push(document.getElementById('fen').innerHTML);
}
*/ 