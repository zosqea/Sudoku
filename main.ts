const size:number = 9;
let symbol:string = '1';
let divBoard = document.createElement('div');

let choseSymbolPanel = document.createElement('div');
document.querySelector('body')?.append(choseSymbolPanel);
choseSymbolPanel.setAttribute('id','choseSymbolPanel');
let choseSymbolTable = document.createElement('table');
choseSymbolTable.setAttribute('id','choseSymbolTable');
choseSymbolPanel.append(choseSymbolTable);
let choseSymbolTableTr = document.createElement('tr');
choseSymbolTable.append(choseSymbolTableTr);
for (let i = 1; i <= size; i++) {
  let tempTd = document.createElement('td');
  tempTd.setAttribute('id',`chose${i}`);
  tempTd.innerText = i + '';
  choseSymbolTableTr.append(tempTd);
  tempTd.onclick = (ev:MouseEvent) => {
    symbol = i + '';
    // for (let j = 0; j < size; j++) {
    //   if(j%2==1) document.getElementById(`chose${j}`)!.setAttribute('style','background-color: aquamarine;');
    //   if(j%2==0) document.getElementById(`chose${j}`)!.setAttribute('style','background-color: rgb(104, 230, 205);');
    // }
    // tempTd.setAttribute('style','background-color: rgb(39, 82, 67);')
  }
  if(i%2==1) tempTd.setAttribute('style','background-color: aquamarine;');
  if(i%2==0) tempTd.setAttribute('style','background-color: rgb(104, 230, 205);');
}

divBoard.setAttribute('id','divBoard');
document.querySelector('body')?.append(divBoard);
let board = document.createElement('table');
board.setAttribute('id','board');
divBoard.append(board);
for (let i = 0; i < size; i++) {
  let tempTr = document.createElement('tr');
  board.append(tempTr);
  for (let j = 0; j < size; j++) {
    let tempTd = document.createElement('td');
    tempTd.setAttribute('id',`cell${i*size + j}`);
    tempTr.append(tempTd);
    if((i*size*3+j)%2==1) tempTd.setAttribute('style','background-color: antiquewhite;');
    if((i*size*3+j)%2==0) tempTd.setAttribute('style','background-color: rgb(248, 215, 158);');
    tempTd.onclick = (ev:MouseEvent) => {
      tempTd.innerText = symbol;
    }
  }
}