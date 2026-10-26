const board = document.getElementById("chessboard");
const turnText = document.getElementById("turn");

let currentTurn = "white";
let selectedSquare = null;

const pieces = {
    white: {
        king: "♔",
        queen: "♕",
        rook: "♖",
        bishop: "♗",
        knight: "♘",
        pawn: "♙"
    },
    black: {
        king: "♚",
        queen: "♛",
        rook: "♜",
        bishop: "♝",
        knight: "♞",
        pawn: "♟"
    }
};

let chessBoard = [
    ["black-rook", "black-knight", "black-bishop", "black-queen",
     "black-king", "black-bishop", "black-knight", "black-rook"],

    ["black-pawn", "black-pawn", "black-pawn", "black-pawn",
     "black-pawn", "black-pawn", "black-pawn", "black-pawn"],

    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],

    ["white-pawn", "white-pawn", "white-pawn", "white-pawn",
     "white-pawn", "white-pawn", "white-pawn", "white-pawn"],

    ["white-rook", "white-knight", "white-bishop", "white-queen",
     "white-king", "white-bishop", "white-knight", "white-rook"]
];

function drawBoard() {
    board.innerHTML = "";

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {

            const square = document.createElement("div");

            square.classList.add("square");

            if ((row + col) % 2 === 0) {
                square.classList.add("light");
            } else {
                square.classList.add("dark");
            }

            const piece = chessBoard[row][col];

            if (piece) {
                const [color, type] = piece.split("-");

                square.textContent = pieces[color][type];
            }

            if (
                selectedSquare &&
                selectedSquare.row === row &&
                selectedSquare.col === col
            ) {
                square.classList.add("selected");
            }

            square.addEventListener("click", () => {
                handleClick(row, col);
            });

            board.appendChild(square);
        }
    }

    turnText.textContent =
        currentTurn === "white"
            ? "White's Turn"
            : "Black's Turn";
}

function handleClick(row, col) {

    const piece = chessBoard[row][col];

    // Select a piece
    if (!selectedSquare) {

        if (!piece) return;

        const color = piece.split("-")[0];

        if (color !== currentTurn) {
            alert("It's " + currentTurn + "'s turn!");
            return;
        }

        selectedSquare = { row, col };

        drawBoard();
        return;
    }

    // Select another piece of same color
    if (piece) {

        const color = piece.split("-")[0];

        if (color === currentTurn) {
            selectedSquare = { row, col };
            drawBoard();
            return;
        }
    }

    // Move selected piece
    if (isValidMove(selectedSquare.row, selectedSquare.col, row, col)) {

        chessBoard[row][col] =
            chessBoard[selectedSquare.row][selectedSquare.col];

        chessBoard[selectedSquare.row][selectedSquare.col] = null;

        currentTurn =
            currentTurn === "white"
                ? "black"
                : "white";

        selectedSquare = null;

        drawBoard();

    } else {
        alert("Invalid move!");
    }
}

function isValidMove(fromRow, fromCol, toRow, toCol) {

    const piece = chessBoard[fromRow][fromCol];

    if (!piece) return false;

    const [color, type] = piece.split("-");

    const target = chessBoard[toRow][toCol];

    // Cannot capture your own piece
    if (target) {
        const targetColor = target.split("-")[0];

        if (targetColor === color) {
            return false;
        }
    }

    const rowDiff = toRow - fromRow;
    const colDiff = toCol - fromCol;

    const absRow = Math.abs(rowDiff);
    const absCol = Math.abs(colDiff);

    // Pawn
    if (type === "pawn") {

        const direction = color === "white" ? -1 : 1;
        const startRow = color === "white" ? 6 : 1;

        // Move forward
        if (colDiff === 0 && !target) {

            if (rowDiff === direction) {
                return true;
            }

            if (
                fromRow === startRow &&
                rowDiff === 2 * direction &&
                !chessBoard[fromRow + direction][fromCol]
            ) {
                return true;
            }
        }

        // Capture diagonally
        if (
            absCol === 1 &&
            rowDiff === direction &&
            target
        ) {
            return true;
        }

        return false;
    }

    // Knight
    if (type === "knight") {
        return (
            (absRow === 2 && absCol === 1) ||
            (absRow === 1 && absCol === 2)
        );
    }

    // King
    if (type === "king") {
        return absRow <= 1 && absCol <= 1;
    }

    // Rook
    if (type === "rook") {

        if (fromRow !== toRow && fromCol !== toCol) {
            return false;
        }

        return pathClear(
            fromRow,
            fromCol,
            toRow,
            toCol
        );
    }

    // Bishop
    if (type === "bishop") {

        if (absRow !== absCol) {
            return false;
        }

        return pathClear(
            fromRow,
            fromCol,
            toRow,
            toCol
        );
    }

    // Queen
    if (type === "queen") {

        if (
            fromRow !== toRow &&
            fromCol !== toCol &&
            absRow !== absCol
        ) {
            return false;
        }

        return pathClear(
            fromRow,
            fromCol,
            toRow,
            toCol
        );
    }

    return false;
}

function pathClear(
    fromRow,
    fromCol,
    toRow,
    toCol
) {

    const rowStep =
        Math.sign(toRow - fromRow);

    const colStep =
        Math.sign(toCol - fromCol);

    let row = fromRow + rowStep;
    let col = fromCol + colStep;

    while (row !== toRow || col !== toCol) {

        if (chessBoard[row][col]) {
            return false;
        }

        row += rowStep;
        col += colStep;
    }

    return true;
}

function resetGame() {

    chessBoard = [
        ["black-rook", "black-knight", "black-bishop", "black-queen",
         "black-king", "black-bishop", "black-knight", "black-rook"],

        ["black-pawn", "black-pawn", "black-pawn", "black-pawn",
         "black-pawn", "black-pawn", "black-pawn", "black-pawn"],

        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],

        ["white-pawn", "white-pawn", "white-pawn", "white-pawn",
         "white-pawn", "white-pawn", "white-pawn", "white-pawn"],

        ["white-rook", "white-knight", "white-bishop", "white-queen",
         "white-king", "white-bishop", "white-knight", "white-rook"]
    ];

    currentTurn = "white";
    selectedSquare = null;

    drawBoard();
}

drawBoard();