//factory function (2players)
const Player = (sign, name) => {
    let points = 0;
    return { sign, name, points };
}
// pl1 = Player('X', 'martin')
// console.log(pl1);


// module pattern of TTT board
const Gameboard = (() => {
    // row1:  012, row2:  345, row3:  678
    let board = ['', '', '', '', '', '', '', '', ''];
    const setField = (fieldIndex, sign) => {
        board[fieldIndex] = sign;
        // console.log(board);
    }
    const getField = (fieldIndex) => {
        return board[fieldIndex];
    }
    const resetBoard = () => {
        board.fill("", 0, 9)
        // console.log(board);
    }

    return { setField, getField, resetBoard }
})()

// DISPLAY
const displayController = (() => {
    const startBtn = document.querySelector(".start-game");
    const pl1Input = document.querySelector(".player1");
    const pl2Input = document.querySelector(".player2");
    const board = document.querySelector(".board");
    const inputNames = document.querySelector(".input-names");
    const fields = document.querySelectorAll(".field");
    const info = document.querySelector(".info");
    const p1name = document.querySelector(".p1name");
    const p2name = document.querySelector(".p2name");
    const message = document.querySelector(".message");

    const startGame = () => {
        console.log("start game");
        initPlayers();
        initDisplay();
        initGame();
    }
    function initPlayers() {
        pl1val = displayController.pl1Input.value;
        const pl1Name = pl1val == '' ? 'Player X' : pl1val;
        pl2val = displayController.pl2Input.value;
        const pl2Name = pl2val == '' ? 'Player O' : pl2val;

        player1 = Player('X', pl1Name)
        player2 = Player('O', pl2Name)
    }
    const initDisplay = () => {
        board.classList.remove("hidden");
        inputNames.classList.add("hidden");
        info.classList.remove("hidden");
        resetBoard()
    }

    const resetBoard = () => {
        Gameboard.resetBoard();
        renderBoard();
    }

    const renderBoard = () => {
        fields.forEach((field, index) => {
            field.innerHTML = Gameboard.getField(index);
        });
    }

    const initGame = () => {
        newgame = gameController(player1, player2);
    }

    const setNames = (pl1Name, pl2Name) => {
        p1name.innerHTML = pl1Name;
        p2name.innerHTML = pl2Name;
    }

    const setMessage = (txt) => {
        message.innerHTML = txt;
    }

    startBtn.addEventListener('click', startGame);
    return { startBtn, pl1Input, pl2Input, board, inputNames, initDisplay, setNames, resetBoard, renderBoard, setMessage };
})();
// console.log(displayController);

// GAME LOGIC
const gameController = (player1, player2) => {
    currentPlayer = player1;
    displayController.setNames(player1.name, player2.name);
    displayController.setMessage(`${currentPlayer.name}'s turn`);
}; // dont call it yet (no IIFE)

