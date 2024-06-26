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
        // for (let i = 0; i < boardArray.length; i++) {
        //   boardArray[i] = 0;
        // }
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
allZero();
console.log(boardArray);
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
//##############################backtacking algoritm
function backtrackingGeneration() {
    var main = new TreeNode(0, false, false);
    var optionsOfValue;
    var currentTreeNode = main;
    var lastAddedValue = main;
    for (var i = 0; i < size * size; i++) {
        optionsOfValue = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        optionsOfValue = differceFillOptionsOfValue(optionsOfValue, currentTreeNode.getValueOfChild());
        do {
            if (optionsOfValue.length == 0) {
                currentTreeNode = currentTreeNode.parent;
                boardArray[i] = 0;
                break;
            }
            var randomNumber = Math.floor(Math.random() * (optionsOfValue.length));
            var randomValue = optionsOfValue[randomNumber];
            optionsOfValue.splice(randomNumber, 1);
            boardArray[i] = randomValue;
            if (randomValue != 0) {
                lastAddedValue = new TreeNode(randomValue, true, false);
                currentTreeNode.addChild(lastAddedValue);
            }
        } while (!checkBoard(boardArray, size) && boardArray[i] != 0);
        if (boardArray[i] != 0)
            currentTreeNode = lastAddedValue;
        else
            i -= 2;
    }
}
function allZero() {
    for (var i = 0; i < boardArray.length; i++) {
        boardArray[i] = 0;
    }
}
function backtrackingSolution() {
    console.log(boardArray);
    var main = new TreeNode(0, false, false);
    var optionsOfValue;
    var currentTreeNode = main;
    var lastAddedValue = main;
    for (var i = 0; i < size * size; i++) {
        optionsOfValue = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        // if(currentTreeNode!=undefined)
        optionsOfValue = differceFillOptionsOfValue(optionsOfValue, currentTreeNode.getValueOfChild());
        if (boardArray[i] != 0) {
            lastAddedValue = new TreeNode(boardArray[i], true, true);
            currentTreeNode.addChild(lastAddedValue);
            currentTreeNode = lastAddedValue;
            console.log('must be: ' + i + ' ' + boardArray[i]);
            // console.log(i + "\t" + boardArray[i]);
        }
        else {
            do {
                if (optionsOfValue.length == 0) {
                    boardArray[i] = 0;
                    while (currentTreeNode.mustBe) {
                        currentTreeNode = currentTreeNode.parent;
                        i--;
                        console.log('while');
                    }
                    i--;
                    boardArray[i] = 0;
                    currentTreeNode = currentTreeNode.parent;
                    //console.log(currentTreeNode);
                    // console.log('aboba');
                    break;
                }
                var randomNumber = Math.floor(Math.random() * (optionsOfValue.length));
                var randomValue = optionsOfValue[randomNumber];
                optionsOfValue.splice(randomNumber, 1);
                boardArray[i] = randomValue;
                if (randomValue != 0) {
                    lastAddedValue = new TreeNode(randomValue, true, false);
                    currentTreeNode.addChild(lastAddedValue);
                }
            } while (!checkBoard(boardArray, size) && boardArray[i] != 0);
            if (boardArray[i] != 0 && optionsOfValue.length != 0)
                currentTreeNode = lastAddedValue;
            else
                i--;
        }
        console.log(boardArray[i] + ' : ' + i);
        // console.log(boardArray[i]);
    }
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
    function TreeNode(value, parentExist, mustBe) {
        this.value = value;
        this.child = new Set();
        this.valueOfAllChild = new Set();
        if (parentExist)
            this.parent = new TreeNode(0, false, false);
        this.mustBe = mustBe;
    }
    TreeNode.prototype.addChild = function (child) {
        this.child.add(child);
        child.parent = this;
        this.valueOfAllChild.add(child.value);
    };
    TreeNode.prototype.addValueOfChild = function (value) {
        this.valueOfAllChild.add(value);
    };
    TreeNode.prototype.getValueOfChild = function () {
        return this.valueOfAllChild;
    };
    return TreeNode;
}());
