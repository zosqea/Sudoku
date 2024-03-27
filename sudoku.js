export var sudoku;
(function (sudoku) {
    sudoku.boardArray = new Array(81);
    function checkBoard(board, size) {
        for (var i = 0, conuterI = 1; i < size; i += 3, conuterI++) {
            var numbersCheck = new Array(9);
            for (var j = 0, counterJ = 1; j < size; j++, counterJ++) {
                numbersCheck[board[i + j]]++;
                if (counterJ % 3 == 0)
                    counterJ += size - 3;
            }
            checkArrayOneOne(numbersCheck);
            if (conuterI % 3 == 0)
                i += 18;
        }
        return true;
    }
    function checkArrayOneOne(checkBoard) {
        for (var i = 0; i < checkBoard.length; i++) {
            if (checkBoard[i] == 1)
                return false;
        }
        return true;
    }
    function checkAlgoritm(size) {
        var counter = 1;
        for (var i = 0, conuterI = 1; i < size; i += 3, conuterI++) {
            for (var j = 0, counterJ = 1; j < size; j++, counterJ++) {
                document.getElementById("cell".concat(i + j)).innerText = counter + "";
                counter++;
                if (counterJ % 3 == 0)
                    counterJ += size - 3;
            }
            if (conuterI % 3 == 0)
                i += 18;
        }
    }
    sudoku.checkAlgoritm = checkAlgoritm;
})(sudoku || (sudoku = {}));
