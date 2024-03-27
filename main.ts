// import {sudoku} from "./sudoku";

// export module main{
  window.addEventListener("contextmenu", e => e.preventDefault());
  let boardArray = new Array<number>(81);
  const size:number = 9;
  let symbol:number = 1;
  let divBoard = document.createElement('div');

  document.querySelector('body')?.addEventListener("keydown" , (event) => {
    let keyCode = event.keyCode;
    if (keyCode>=49&&keyCode<=57) {
      document.getElementById(`chose${keyCode-48}`)?.click();
    }
  });

  let mistakesPanel = document.createElement('div');
  document.querySelector('body')?.append(mistakesPanel);
  mistakesPanel.setAttribute('id','mistakesPanel');
  let mistakesText = document.createElement('text');
  mistakesPanel.append(mistakesText);
  mistakesText.setAttribute('id','mistakesText');

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
      symbol = i;
      for (let j = 1; j <= size; j++) {
        if(j%2==1) document.getElementById(`chose${j}`)?.setAttribute('style','background-color: aquamarine;');
        if(j%2==0) document.getElementById(`chose${j}`)?.setAttribute('style','background-color: rgb(104, 230, 205);');
      }
      tempTd.setAttribute('style','background-color: rgb(39, 82, 67);');
    }
    if(i%2==1) tempTd.setAttribute('style','background-color: aquamarine;');
    if(i%2==0) tempTd.setAttribute('style','background-color: rgb(104, 230, 205);');
    document.getElementById('chose1')?.setAttribute('style','background-color: rgb(39, 82, 67);');
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
      if((i*size*3+j)%2==1) tempTd.setAttribute('class','oddCell');
      if((i*size*3+j)%2==0) tempTd.setAttribute('class','evenCell');
      if(i%3==0) tempTd.setAttribute('style', 'border-top: 2px solid black;');
      if(j%3==0) tempTd.setAttribute('style', 'border-left: 2px solid black;');
      if(i%3==0&&j%3==0) tempTd.setAttribute('style', 'border-top: 2px solid black; border-left: 2px solid black;');
      // tempTd.innerText = (i*size+j) + "";
      tempTd.onclick = (ev:MouseEvent) => {
        boardArray[i*size+j] = symbol;
        displayMistakes();
        displayBoard(boardArray);
      }
      tempTd.onmouseup = (ev:MouseEvent) => {
        boardArray[i*size+j] = 0;
        displayMistakes();
        displayBoard(boardArray);
      }
    }
  }

  function checkBoard(board:number[], size:number):boolean{
    for (let i = 0, conuterI = 1; i < size*size; i+=3, conuterI++) {
      let numbersCheck = new Array<number>(10);
      numbersCheck = zeroFill(numbersCheck);
      for (let j = 0, counterJ = 0; j < 21; j++, counterJ++) {
        if(counterJ%3==0&&counterJ!=0) j+=size - 3;
        if(board[i+j]!=0) numbersCheck[board[i+j]]++;
        if(numbersCheck[board[i+j]]>1) return false;
      }
      if(conuterI%3==0&&conuterI!=0) i+=18;
    }
    for (let i = 0; i < size; i++) {
      let numbersCheckX = new Array<number>(10);
      numbersCheckX = zeroFill(numbersCheckX);
      let numbersCheckY = new Array<number>(10);
      numbersCheckY = zeroFill(numbersCheckY);
      for (let j = 0; j < size; j++) {
        if(board[i*size+j]!=0) numbersCheckX[board[i*size+j]]++;
        if(numbersCheckX[board[i*size+j]]>1) return false;
        if(board[j*size+i]!=0) numbersCheckY[board[j*size+i]]++;
        if(numbersCheckY[board[j*size+i]]>1) return false;
      }
    }
    return true;
  }

  function checkAlgoritmBigCell(size:number):void{
    let counter:number = 0;
    for (let i = 0, conuterI = 1; i < size*size; i+=3, conuterI++) {
      for (let j = 0, counterJ = 0; j < 21; j++, counterJ++) {
        if(counterJ%3==0&&counterJ!=0) j+=size - 3;
        document.getElementById(`cell${i+j}`)!.innerText = counter + "";
        counter++;
      }
      if(conuterI%3==0&&conuterI!=0) i+=18;
    }
  }
  function checkAlgoritmLine(size:number):void{
    let counter:number = 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        document.getElementById(`cell${j*size + i}`)!.innerText = counter + "";
        counter++;
      }
    }
  }

  function displayBoard(boardArray:number[]):void{
    for (let i = 0; i < size*size; i++) {
      if(boardArray[i]>0) document.getElementById(`cell${i}`)!.innerText = boardArray[i] + "";
      else document.getElementById(`cell${i}`)!.innerText = '';
    }
  }

  function displayMistakes(){
    if(checkBoard(boardArray,size)) document.getElementById('mistakesText')!.innerText = 'true';
    else document.getElementById('mistakesText')!.innerText = 'false';
  }

  function zeroFill(array:number[]):number[]{
    for (let i = 0; i < array.length; i++) {
      array[i]=0;
    }
    return array;
  }
//}