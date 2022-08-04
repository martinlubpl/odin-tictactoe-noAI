//factory function (2players)
const Player = (sign, name="") => {
    this.sign = sign;
    this.name = name;

    return {sign, name};
}

// module pattern of TTT board
const Gameboard = (() => {
    // row1:  012, row2:  345, row3:  678
    let board = ['','','','','','','','',''];
    const setField = (fieldIndex, sign) => {
        board[fieldIndex] = sign;
    }
    const getField = (fieldIndex) => {
        return board[fieldIndex];
    }
    const resetBoard = () => {
        board.fill("",0,9)
        console.log(board);
    }

    return {setField, getField, resetBoard}
})()

Gameboard.resetBoard();
Gameboard.setField(0, "X");
console.log(Gameboard.getField(0));
console.log(Gameboard.getField(9));
