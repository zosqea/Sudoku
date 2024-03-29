// import {sudoku} from "./sudoku";
var _a, _b, _c, _d, _e;
// export module main{
window.addEventListener("contextmenu", function (e) { return e.preventDefault(); });
var boardArray = new Array(81);
var size = 9;
var symbol = 1;
var divBoard = document.createElement('div');
(_a = document.querySelector('body')) === null || _a === void 0 ? void 0 : _a.addEventListener("keyup", function (event) {
    var _a;
    var keyCode = event.keyCode;
    if (keyCode >= 49 && keyCode <= 57) {
        (_a = document.getElementById("chose".concat(keyCode - 48))) === null || _a === void 0 ? void 0 : _a.click();
    }
    if (keyCode == 71) {
        backtrackingSolution();
        displayBoard(boardArray);
    }
});
var mistakesPanel = document.createElement('div');
(_b = document.querySelector('body')) === null || _b === void 0 ? void 0 : _b.append(mistakesPanel);
mistakesPanel.setAttribute('id', 'mistakesPanel');
var mistakesText = document.createElement('text');
mistakesPanel.append(mistakesText);
mistakesText.setAttribute('id', 'mistakesText');
var choseSymbolPanel = document.createElement('div');
(_c = document.querySelector('body')) === null || _c === void 0 ? void 0 : _c.append(choseSymbolPanel);
choseSymbolPanel.setAttribute('id', 'choseSymbolPanel');
var choseSymbolTable = document.createElement('table');
choseSymbolTable.setAttribute('id', 'choseSymbolTable');
choseSymbolPanel.append(choseSymbolTable);
var choseSymbolTableTr = document.createElement('tr');
choseSymbolTable.append(choseSymbolTableTr);
var _loop_1 = function (i) {
    var tempTd = document.createElement('td');
    tempTd.setAttribute('id', "chose".concat(i));
    tempTd.innerText = i + '';
    choseSymbolTableTr.append(tempTd);
    tempTd.onclick = function (ev) {
        var _a, _b;
        symbol = i;
        for (var j = 1; j <= size; j++) {
            if (j % 2 == 1)
                (_a = document.getElementById("chose".concat(j))) === null || _a === void 0 ? void 0 : _a.setAttribute('style', 'background-color: aquamarine;');
            if (j % 2 == 0)
                (_b = document.getElementById("chose".concat(j))) === null || _b === void 0 ? void 0 : _b.setAttribute('style', 'background-color: rgb(104, 230, 205);');
        }
        tempTd.setAttribute('style', 'background-color: rgb(39, 82, 67);');
    };
    if (i % 2 == 1)
        tempTd.setAttribute('style', 'background-color: aquamarine;');
    if (i % 2 == 0)
        tempTd.setAttribute('style', 'background-color: rgb(104, 230, 205);');
    (_d = document.getElementById('chose1')) === null || _d === void 0 ? void 0 : _d.setAttribute('style', 'background-color: rgb(39, 82, 67);');
};
for (var i = 1; i <= size; i++) {
    _loop_1(i);
}
divBoard.setAttribute('id', 'divBoard');
(_e = document.querySelector('body')) === null || _e === void 0 ? void 0 : _e.append(divBoard);
var board = document.createElement('table');
board.setAttribute('id', 'board');
divBoard.append(board);
var _loop_2 = function (i) {
    var tempTr = document.createElement('tr');
    board.append(tempTr);
    var _loop_3 = function (j) {
        var tempTd = document.createElement('td');
        tempTd.setAttribute('id', "cell".concat(i * size + j));
        tempTr.append(tempTd);
        if ((i * size * 3 + j) % 2 == 1)
            tempTd.setAttribute('class', 'oddCell');
        if ((i * size * 3 + j) % 2 == 0)
            tempTd.setAttribute('class', 'evenCell');
        if (i % 3 == 0)
            tempTd.setAttribute('style', 'border-top: 2px solid black;');
        if (j % 3 == 0)
            tempTd.setAttribute('style', 'border-left: 2px solid black;');
        if (i % 3 == 0 && j % 3 == 0)
            tempTd.setAttribute('style', 'border-top: 2px solid black; border-left: 2px solid black;');
        // tempTd.innerText = (i*size+j) + "";
        tempTd.onclick = function (ev) {
            boardArray[i * size + j] = symbol;
            displayMistakes();
            displayBoard(boardArray);
        };
        tempTd.onmouseup = function (ev) {
            boardArray[i * size + j] = 0;
            displayMistakes();
            displayBoard(boardArray);
        };
    };
    for (var j = 0; j < size; j++) {
        _loop_3(j);
    }
};
for (var i = 0; i < size; i++) {
    _loop_2(i);
}
function checkBoard(board, size) {
    for (var i = 0, conuterI = 1; i < size * size; i += 3, conuterI++) {
        var numbersCheck = new Array(10);
        numbersCheck = zeroFill(numbersCheck);
        for (var j = 0, counterJ = 0; j < 21; j++, counterJ++) {
            if (counterJ % 3 == 0 && counterJ != 0)
                j += size - 3;
            if (board[i + j] != 0)
                numbersCheck[board[i + j]]++;
            if (numbersCheck[board[i + j]] > 1)
                return false;
        }
        if (conuterI % 3 == 0 && conuterI != 0)
            i += 18;
    }
    for (var i = 0; i < size; i++) {
        var numbersCheckX = new Array(10);
        numbersCheckX = zeroFill(numbersCheckX);
        var numbersCheckY = new Array(10);
        numbersCheckY = zeroFill(numbersCheckY);
        for (var j = 0; j < size; j++) {
            if (board[i * size + j] != 0)
                numbersCheckX[board[i * size + j]]++;
            if (numbersCheckX[board[i * size + j]] > 1)
                return false;
            if (board[j * size + i] != 0)
                numbersCheckY[board[j * size + i]]++;
            if (numbersCheckY[board[j * size + i]] > 1)
                return false;
        }
    }
    return true;
}
function displayBoard(boardArray) {
    for (var i = 0; i < size * size; i++) {
        if (boardArray[i] > 0)
            document.getElementById("cell".concat(i)).innerText = boardArray[i] + "";
        else
            document.getElementById("cell".concat(i)).innerText = '';
    }
}
function displayMistakes() {
    if (checkBoard(boardArray, size))
        document.getElementById('mistakesText').innerText = 'true';
    else
        document.getElementById('mistakesText').innerText = 'false';
}
function zeroFill(array) {
    for (var i = 0; i < array.length; i++) {
        array[i] = 0;
    }
    return array;
}
function boardGenerate(board, size) {
    var heapOfNumbers = new Array(81);
    for (var i = 0; i < heapOfNumbers.length;) {
        for (var j = 1; j <= 9; j++) {
            heapOfNumbers[i] = j;
            i++;
        }
    }
    var randomNumber;
    var lengthOfHeap = 80;
    for (var i = 0; i < board.length; i++) {
        do {
            randomNumber = Math.floor(Math.random() * (lengthOfHeap + 1));
            board[i] = heapOfNumbers[randomNumber];
        } while (!checkBoard(board, size));
        heapOfNumbers[randomNumber] = heapOfNumbers[lengthOfHeap];
        heapOfNumbers[lengthOfHeap] = 0;
        lengthOfHeap--;
        console.log(i);
    }
}
function boardGenerateSecond() {
    console.log("Start funct");
    var exception = [];
    var randomNumberLast;
    var pointOne = 0;
    var pointTwo = 0;
    for (var i = 0, counter = 0; i < 9; i++) {
        exception = [];
        do {
            if (i > pointTwo && pointTwo != 0) {
                pointOne = 0;
                pointTwo = 0;
            }
            if (checkArrayExceptionSum(exception)) {
                if (pointOne <= 0) {
                    pointOne = i - 2;
                    console.log("Aboba");
                    pointTwo = i;
                }
                else {
                    pointOne -= 2;
                }
                i = pointOne;
                boardArray[i] = 0;
                // console.log(exception);
                break;
            }
            ;
            randomNumberLast = randomBetween(0, 10, exception);
            boardArray[i] = randomNumberLast;
            exception.push(randomNumberLast);
            //console.log(i);
        } while (!checkBoard(boardArray, size));
    }
    console.log('End func');
}
function randomBetween(min, max, exception) {
    var randomNumber;
    do {
        randomNumber = Math.floor((Math.random() * (max - min) + min));
    } while (searchNumberArray(exception, randomNumber));
    return randomNumber;
}
function searchNumberArray(array, searchedNumber) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == searchedNumber)
            return true;
    }
    return false;
}
function checkArrayExceptionSum(array) {
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum == 45;
}
//##############################backtacking algoritm
function backtrackingSolution() {
    var main = new TreeNode(0);
    var optionsOfValue;
    var currentTreeNode = main;
    var lastAddedValue = main;
    for (var i = 0, counter = 0; i < size * size; i++) {
        optionsOfValue = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        optionsOfValue = differceFillOptionsOfValue(optionsOfValue, currentTreeNode.valueOfAllChild);
        do {
            if (optionsOfValue.length == 0) {
                currentTreeNode = currentTreeNode.parent;
                boardArray[i] = 0;
                //console.log('aboba');
                counter++;
                break;
            }
            var randomNumber = Math.floor(Math.random() * (optionsOfValue.length));
            var randomValue = optionsOfValue[randomNumber];
            optionsOfValue.splice(randomNumber, randomNumber);
            boardArray[i] = randomValue;
            lastAddedValue = new TreeNode(randomValue);
            currentTreeNode.addChild(lastAddedValue);
            //console.log(randomValue);
            //console.log(optionsOfValue);
            //console.log(randomNumber);
        } while (!checkBoard(boardArray, size) && boardArray[i] != 0);
        if (boardArray[i] != 0)
            currentTreeNode = lastAddedValue;
        else
            i -= 2;
        console.log(i);
        //if(counter>=1000) board;
        // console.log(counter);
    }
}
// for (let i = 0; i < 20; i++) {
//   console.log(Math.floor(Math.random()*(9)))
// }
function allBoardCheck() {
    boardArray.forEach(function (item) {
        if (boardArray[item] == 0)
            return false;
    });
    return true;
}
function differceFillOptionsOfValue(array, hashset) {
    if (hashset == undefined)
        return array;
    hashset.forEach(function (item) {
        if (array.indexOf(item) != -1)
            array.splice(array.indexOf(item), 1);
    });
    return array;
}
var TreeNode = /** @class */ (function () {
    function TreeNode(value) {
        this.value = value;
        this.child = new Set();
    }
    TreeNode.prototype.addChild = function (child) {
        var _a;
        this.child.add(child);
        (_a = this.valueOfAllChild) === null || _a === void 0 ? void 0 : _a.add(child.value);
        child.parent = this;
    };
    return TreeNode;
}());
