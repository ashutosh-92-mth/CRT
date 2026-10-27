const players = ["red", "green", "yellow", "blue"];

const playerNames = {
    red: "RED",
    green: "GREEN",
    yellow: "YELLOW",
    blue: "BLUE"
};

const playerColors = {
    red: "#e53935",
    green: "#43a047",
    yellow: "#fbc02d",
    blue: "#1e88e5"
};

/*
    Each player starts at a different position
    on the 52-cell common track.
*/

const startPositions = {
    red: 0,
    green: 13,
    yellow: 26,
    blue: 39
};

/*
    0  = token inside home
    1  = first position on track
    ...
    52 = last common-track position
    53-56 = player's final lane
    57 = finished
*/

let game = {
    currentPlayer: 0,
    dice: 0,
    rolled: false,
    gameOver: false,

    tokens: {
        red: [0, 0, 0, 0],
        green: [0, 0, 0, 0],
        yellow: [0, 0, 0, 0],
        blue: [0, 0, 0, 0]
    }
};

/* -----------------------------
       BOARD PATH
------------------------------ */

const path = document.getElementById("path");

/*
    Coordinates for the 52-cell Ludo path.
    These coordinates are relative to a 15x15 board.
*/

const pathCoordinates = [

    // Top
    [0, 6],
    [0, 7],
    [0, 8],

    [1, 8],
    [2, 8],
    [3, 8],
    [4, 8],
    [5, 8],

    // Right
    [6, 8],
    [6, 9],
    [6, 10],
    [6, 11],
    [6, 12],
    [6, 13],
    [7, 13],
    [8, 13],

    [8, 12],
    [8, 11],
    [8, 10],
    [8, 9],

    // Bottom
    [8, 8],
    [9, 8],
    [10, 8],
    [11, 8],
    [12, 8],
    [13, 8],
    [14, 8],

    [14, 7],
    [14, 6],

    [13, 6],
    [12, 6],
    [11, 6],
    [10, 6],
    [9, 6],

    // Left
    [8, 6],
    [8, 5],
    [8, 4],
    [8, 3],
    [8, 2],
    [8, 1],
    [7, 1],
    [6, 1],

    [6, 2],
    [6, 3],
    [6, 4],
    [6, 5],

    [6, 6],
    [5, 6],
    [4, 6],
    [3, 6],
    [2, 6],
    [1, 6]
];

/* Create path cells */

pathCoordinates.forEach((coordinate, index) => {

    const cell = document.createElement("div");

    cell.classList.add("cell");

    cell.dataset.position = index;

    /*
        Start positions
    */

    if (index === 0) {
        cell.classList.add("red-path");
    }

    if (index === 13) {
        cell.classList.add("green-path");
    }

    if (index === 26) {
        cell.classList.add("yellow-path");
    }

    if (index === 39) {
        cell.classList.add("blue-path");
    }

    /*
        Safe cells
    */

    const safeCells = [0, 8, 13, 21, 26, 34, 39, 47];

    if (safeCells.includes(index)) {
        cell.classList.add("safe");
    }

    path.appendChild(cell);

});


/* -----------------------------
        DRAW HOME TOKENS
------------------------------ */

function drawHomeTokens() {

    players.forEach(player => {

        const container =
            document.getElementById(player + "Home");

        container.innerHTML = "";

        for (let i = 0; i < 4; i++) {

            /*
                Only display token in home
                if its position is 0.
            */

            if (game.tokens[player][i] === 0) {

                const token =
                    createToken(player, i);

                container.appendChild(token);

            }
        }

    });
}


/* -----------------------------
        CREATE TOKEN
------------------------------ */

function createToken(player, tokenIndex) {

    const token =
        document.createElement("div");

    token.classList.add("token");

    token.style.background =
        playerColors[player];

    token.textContent =
        tokenIndex + 1;

    token.onclick = function(event) {

        event.stopPropagation();

        selectToken(player, tokenIndex);

    };

    return token;
}


/* -----------------------------
        DRAW MOVING TOKENS
------------------------------ */

function drawBoardTokens() {

    /*
        Remove previous tokens
    */

    document
        .querySelectorAll(".board-token")
        .forEach(token => token.remove());


    players.forEach(player => {

        for (let i = 0; i < 4; i++) {

            const position =
                game.tokens[player][i];

            /*
                Only tokens currently
                on the board are drawn.
            */

            if (position >= 1 && position <= 56) {

                drawTokenOnBoard(
                    player,
                    i,
                    position
                );

            }

        }

    });

}


/* -----------------------------
        DRAW TOKEN ON BOARD
------------------------------ */

function drawTokenOnBoard(
    player,
    tokenIndex,
    position
) {

    const token =
        document.createElement("div");

    token.classList.add("board-token");

    token.style.background =
        playerColors[player];

    token.textContent =
        tokenIndex + 1;

    /*
        Position 1-52 = common track
        Position 53-56 = final lane
    */

    let coordinate;

    if (position <= 52) {

        const index =
            getGlobalPathIndex(
                player,
                position
            );

        coordinate =
            pathCoordinates[index];

    } else {

        coordinate =
            getHomeLaneCoordinate(
                player,
                position
            );

    }

    /*
        Find cell from coordinate
    */

    const cells =
        document.querySelectorAll(".cell");

    if (position <= 52) {

        const index =
            getGlobalPathIndex(
                player,
                position
            );

        const cell = cells[index];

        cell.appendChild(token);

    } else {

        const cell =
            getLaneCell(
                player,
                position
            );

        if (cell) {
            cell.appendChild(token);
        }

    }

    token.onclick = function(event) {

        event.stopPropagation();

        selectToken(player, tokenIndex);

    };

}


/* -----------------------------
        GLOBAL PATH INDEX
------------------------------ */

function getGlobalPathIndex(
    player,
    position
) {

    /*
        position 1 means player's start.
    */

    return (
        startPositions[player] +
        position -
        1
    ) % 52;

}


/* -----------------------------
        HOME LANES
------------------------------ */

const homeLanes = {

    red: [
        [6, 7],
        [6, 6],
        [6, 5],
        [6, 4]
    ],

    green: [
        [7, 8],
        [8, 8],
        [9, 8],
        [10, 8]
    ],

    yellow: [
        [8, 7],
        [8, 6],
        [8, 5],
        [8, 4]
    ],

    blue: [
        [7, 6],
        [6, 6],
        [5, 6],
        [4, 6]
    ]

};


/*
    Get home lane coordinate.
*/

function getHomeLaneCoordinate(
    player,
    position
) {

    const lane =
        homeLanes[player];

    const index =
        position - 53;

    return lane[index];

}


/*
    Find a cell corresponding to
    a home lane.
*/

function getLaneCell(
    player,
    position
) {

    const coordinate =
        getHomeLaneCoordinate(
            player,
            position
        );

    if (!coordinate) {
        return null;
    }

    /*
        Since our visual board uses
        the path layer, create a temporary
        cell for the lane if required.
    */

    return null;
}


/* -----------------------------
        SELECT TOKEN
------------------------------ */

function selectToken(
    player,
    tokenIndex
) {

    if (game.gameOver) {
        return;
    }

    const current =
        players[game.currentPlayer];

    /*
        Only current player can move.
    */

    if (player !== current) {

        showMessage(
            "It's " +
            playerNames[current] +
            "'s turn!"
        );

        return;
    }

    /*
        Dice must be rolled first.
    */

    if (!game.rolled) {

        showMessage(
            "Roll the dice first!"
        );

        return;
    }

    const position =
        game.tokens[player][tokenIndex];

    /*
        Token in home
    */

    if (position === 0) {

        if (game.dice !== 6) {

            showMessage(
                "You need a 6 to bring this token out."
            );

            return;
        }

        game.tokens[player][tokenIndex] = 1;

    } else {

        const newPosition =
            position + game.dice;

        /*
            Cannot go beyond 57
        */

        if (newPosition > 57) {

            showMessage(
                "You need an exact number to reach home."
            );

            return;
        }

        game.tokens[player][tokenIndex] =
            newPosition;

    }

    /*
        Check capture
    */

    captureOpponent(
        player,
        tokenIndex
    );

    /*
        Check winner
    */

    if (checkWinner(player)) {

        game.gameOver = true;

        document.getElementById("rollBtn")
            .disabled = true;

        showMessage(
            "🏆 " +
            playerNames[player] +
            " WINS!"
        );

        return;
    }

    /*
        Token moved successfully
    */

    game.rolled = false;

    drawGame();

    /*
        Six gives another turn
    */

    if (game.dice === 6) {

        showMessage(
            "🎉 " +
            playerNames[player] +
            " gets another turn!"
        );

        game.dice = 0;

        return;
    }

    nextPlayer();

}


/* -----------------------------
        CAPTURE
------------------------------ */

function captureOpponent(
    player,
    tokenIndex
) {

    const position =
        game.tokens[player][tokenIndex];

    /*
        Tokens in home lane cannot
        capture or be captured.
    */

    if (position > 52 || position === 0) {
        return;
    }

    const globalPosition =
        getGlobalPathIndex(
            player,
            position
        );

    /*
        Safe cells cannot be captured.
    */

    const safeCells =
        [0, 8, 13, 21, 26, 34, 39, 47];

    if (safeCells.includes(globalPosition)) {
        return;
    }

    /*
        Check every opponent token.
    */

    players.forEach(opponent => {

        if (opponent === player) {
            return;
        }

        for (let i = 0; i < 4; i++) {

            const opponentPosition =
                game.tokens[opponent][i];

            if (
                opponentPosition >= 1 &&
                opponentPosition <= 52
            ) {

                const opponentGlobal =
                    getGlobalPathIndex(
                        opponent,
                        opponentPosition
                    );

                if (
                    opponentGlobal ===
                    globalPosition
                ) {

                    /*
                        Send opponent back home.
                    */

                    game.tokens[opponent][i] = 0;

                    showMessage(
                        "🔪 " +
                        playerNames[player] +
                        " captured " +
                        playerNames[opponent] +
                        "!"
                    );

                }

            }

        }

    });

}


/* -----------------------------
        CHECK WINNER
------------------------------ */

function checkWinner(player) {

    return game.tokens[player]
        .every(position => position === 57);

}


/* -----------------------------
        NEXT PLAYER
------------------------------ */

function nextPlayer() {

    game.currentPlayer++;

    if (game.currentPlayer >= players.length) {
        game.currentPlayer = 0;
    }

    game.dice = 0;
    game.rolled = false;

    updateTurn();

}


/* -----------------------------
        ROLL DICE
------------------------------ */

function rollDice() {

    if (game.gameOver) {
        return;
    }

    if (game.rolled) {

        showMessage(
            "Choose a token to move."
        );

        return;
    }

    game.dice =
        Math.floor(Math.random() * 6) + 1;

    game.rolled = true;

    document.getElementById("dice")
        .textContent =
        getDiceFace(game.dice);

    const player =
        players[game.currentPlayer];

    showMessage(
        playerNames[player] +
        " rolled " +
        game.dice
    );

    /*
        Check if player has any legal move.
    */

    if (!hasLegalMove(player)) {

        showMessage(
            playerNames[player] +
            " has no valid move."
        );

        setTimeout(() => {

            if (game.dice !== 6) {
                nextPlayer();
            } else {
                game.rolled = false;
            }

        }, 800);

    }

}


/* -----------------------------
        CHECK LEGAL MOVE
------------------------------ */

function hasLegalMove(player) {

    for (let i = 0; i < 4; i++) {

        const position =
            game.tokens[player][i];

        /*
            Home token needs 6
        */

        if (
            position === 0 &&
            game.dice === 6
        ) {
            return true;
        }

        /*
            Moving token
        */

        if (
            position > 0 &&
            position + game.dice <= 57
        ) {
            return true;
        }

    }

    return false;

}


/* -----------------------------
        DICE FACE
------------------------------ */

function getDiceFace(number) {

    const faces = [
        "🎲",
        "⚀",
        "⚁",
        "⚂",
        "⚃",
        "⚄",
        "⚅"
    ];

    return faces[number];

}


/* -----------------------------
        UPDATE TURN
------------------------------ */

function updateTurn() {

    const player =
        players[game.currentPlayer];

    document.getElementById("turn")
        .textContent =
        playerNames[player] +
        "'S TURN";

}


/* -----------------------------
        MESSAGE
------------------------------ */

function showMessage(message) {

    document.getElementById("message")
        .textContent = message;

}


/* -----------------------------
        DRAW GAME
------------------------------ */

function drawGame() {

    drawHomeTokens();

    drawBoardTokens();

    updateTurn();

}


/* -----------------------------
        RESTART
------------------------------ */

function restartGame() {

    game = {

        currentPlayer: 0,

        dice: 0,

        rolled: false,

        gameOver: false,

        tokens: {
            red: [0, 0, 0, 0],
            green: [0, 0, 0, 0],
            yellow: [0, 0, 0, 0],
            blue: [0, 0, 0, 0]
        }

    };

    document.getElementById("rollBtn")7e
    
        .disabled = false;

    document.getElementById("dice")
        .textContent = "🎲";

    showMessage(
        "Roll the dice to start!"
    );

    drawGame();

}


/* -----------------------------
        START GAME
------------------------------ */

drawGame();