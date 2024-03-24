var _a, _b;
var size = 9;
var symbol = '1';
var divBoard = document.createElement('div');
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
        symbol = i + '';
        // for (let j = 0; j < size; j++) {
        //   if(j%2==1) document.getElementById(`chose${j}`)!.setAttribute('style','background-color: aquamarine;');
        //   if(j%2==0) document.getElementById(`chose${j}`)!.setAttribute('style','background-color: rgb(104, 230, 205);');
        // }
        // tempTd.setAttribute('style','background-color: rgb(39, 82, 67);')
    };
    if (i % 2 == 1)
        tempTd.setAttribute('style', 'background-color: aquamarine;');
    if (i % 2 == 0)
        tempTd.setAttribute('style', 'background-color: rgb(104, 230, 205);');
};
for (var i = 1; i <= size; i++) {
    _loop_1(i);
}
divBoard.setAttribute('id', 'divBoard');
(_b = document.querySelector('body')) === null || _b === void 0 ? void 0 : _b.append(divBoard);
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
            tempTd.setAttribute('style', 'background-color: antiquewhite;');
        if ((i * size * 3 + j) % 2 == 0)
            tempTd.setAttribute('style', 'background-color: rgb(248, 215, 158);');
        tempTd.onclick = function (ev) {
            tempTd.innerText = symbol;
        };
    };
    for (var j = 0; j < size; j++) {
        _loop_2(j);
    }
}
