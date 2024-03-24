var _a, _b, _c;
var size = 9;
var symbol = '1';
var divBoard = document.createElement('div');
window.addEventListener("contextmenu", function (e) { return e.preventDefault(); });
var choseSymbolPanel = document.createElement('div');
(_a = document.querySelector('body')) === null || _a === void 0 ? void 0 : _a.append(choseSymbolPanel);
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
        symbol = i + '';
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
    (_b = document.getElementById('chose1')) === null || _b === void 0 ? void 0 : _b.setAttribute('style', 'background-color: rgb(39, 82, 67);');
};
for (var i = 1; i <= size; i++) {
    _loop_1(i);
}
divBoard.setAttribute('id', 'divBoard');
(_c = document.querySelector('body')) === null || _c === void 0 ? void 0 : _c.append(divBoard);
var board = document.createElement('table');
board.setAttribute('id', 'board');
divBoard.append(board);
for (var i = 0; i < size; i++) {
    var tempTr = document.createElement('tr');
    board.append(tempTr);
    var _loop_2 = function (j) {
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
        tempTd.onclick = function (ev) {
            tempTd.innerText = symbol;
        };
        tempTd.onmouseup = function (ev) {
            tempTd.innerText = '';
        };
    };
    for (var j = 0; j < size; j++) {
        _loop_2(j);
    }
}
