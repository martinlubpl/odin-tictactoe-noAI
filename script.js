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
    const checkTie = () => {
        return !board.includes('');
    }


    return { setField, getField, resetBoard, checkTie }
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
    const p1points = document.querySelector(".player1-score .score");
    const p2points = document.querySelector(".player2-score .score");
    const message = document.querySelector(".message");
    const resetBtn = document.querySelector("#play-again");
    

    resetBtn.addEventListener('click', () => {
        Gameboard.resetBoard();
        renderBoard();
        hideReset();
        console.log(gameController);
        // gameController.startGame();
        newgame.startGame();
    })

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
        // dataset.index [data-index] for fields
        fields.forEach((field, index) => {
            field.dataset.index = index;
        })
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
    const updatePoints = (points1, points2) => {
        p1points.innerHTML = points1;
        p2points.innerHTML = points2;
    }
    const showReset = () => {
        resetBtn.classList.remove("hidden");
    }
    const hideReset = () => {
        resetBtn.classList.add("hidden");
    }

    startBtn.addEventListener('click', startGame);
    return { startBtn, pl1Input, pl2Input, board, inputNames, initDisplay, setNames, resetBoard, renderBoard, setMessage, updatePoints,showReset };
})();
// console.log(displayController);

// GAME LOGIC
const gameController = (player1, player2) => {
    
    displayController.setNames(player1.name, player2.name);
    //event delegation DRY
    const handleFieldClick = (e) => {
        if (e.target.classList.contains('field')) {
            const fieldIndex = e.target.dataset.index;
            if (Gameboard.getField(fieldIndex) == '') {
                Gameboard.setField(fieldIndex, currentPlayer.sign);
                displayController.renderBoard();
                let moveResult = checkWin();
                console.log(moveResult);
                
                // game not finished
                if (!moveResult) {
                    changePlayer();
                    displayController.setMessage(`${currentPlayer.name}'s turn`);
                //tie (finished)
                } else if (moveResult == 'tie') {
                    displayController.setMessage('It\'s a Tie');
                    displayController.showReset();
                //win (finished)
                } else {
                    displayController.setMessage(`${currentPlayer.name} wins!`);
                    disableFields();
                    currentPlayer.points++;
                    displayController.updatePoints(player1.points, player2.points);
                    displayController.showReset();
                }
            }
        }
    }
    
    
    
    
    const startGame = () => {
        // todo: change to random player ??
        currentPlayer = player1;
        displayController.setMessage(`${currentPlayer.name}'s turn`);
        // todo: move to displayController  
        displayController.board.addEventListener('click', handleFieldClick);
    }


    const checkWin = () => {
        let result = false;
        const winningFields = [
            [0, 1, 2], //rows
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6], // columns
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8], // diagonals
            [2, 4, 6],
        ];
        winningFields.forEach((fieldsArr) => {
            if (Gameboard.getField(fieldsArr[0]) == currentPlayer.sign && Gameboard.getField(fieldsArr[1]) == currentPlayer.sign && Gameboard.getField(fieldsArr[2]) == currentPlayer.sign) {
                result = "win";
            }
        })

        if (!result) {
            // todo: no win, check for tie
            if (Gameboard.checkTie()) {
                result = "tie";
            }
        }

        return result; // returns win, tie or false
    }
    const changePlayer = () => {
        if (currentPlayer == player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }
    //disable fields after win
    const disableFields = () => {
        displayController.board.removeEventListener('click', handleFieldClick);
    }

    startGame();

    return { startGame };
}; // dont call it yet (no IIFE), wait for names

