// import {sudoku} from "./sudoku";

// export module main{
  window.addEventListener("contextmenu", e => e.preventDefault());
  let boardArray = new Array<number>(81);
  const size:number = 9;
  let symbol:number = 1;
  let divBoard = document.createElement('div');

  document.querySelector('body')?.addEventListener("keyup" , (event) => {
    let keyCode = event.keyCode;
    if (keyCode>=49&&keyCode<=57) {
      document.getElementById(`chose${keyCode-48}`)?.click();
    }
    if(keyCode==71){
      // for (let i = 0; i < boardArray.length; i++) {
      //   boardArray[i] = 0;
      // }
      backtrackingSolution();
      displayBoard(boardArray);
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

  allZero();
  console.log(boardArray);

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

  //##############################backtacking algoritm
  function backtrackingGeneration():void{
    let main:TreeNode = new TreeNode(0,false,false);
    let optionsOfValue:number[];
    let currentTreeNode:TreeNode = main;
    let lastAddedValue:TreeNode = main;
    for (let i = 0; i < size*size; i++) {
      optionsOfValue = [1,2,3,4,5,6,7,8,9];
      optionsOfValue = differceFillOptionsOfValue(optionsOfValue, currentTreeNode.getValueOfChild());
      do{
        if(optionsOfValue.length == 0){
          currentTreeNode = currentTreeNode.parent!;
          boardArray[i] = 0;
          break;
        }
        let randomNumber:number = Math.floor(Math.random()*(optionsOfValue.length));
        let randomValue:number = optionsOfValue[randomNumber];
        optionsOfValue.splice(randomNumber,1);
        boardArray[i] = randomValue;
        if(randomValue!=0){
          lastAddedValue = new TreeNode(randomValue,true,false);
          currentTreeNode.addChild(lastAddedValue);
        }
      }while (!checkBoard(boardArray,size)&&boardArray[i]!=0);
      if(boardArray[i]!=0) currentTreeNode = lastAddedValue;
      else i-=2;
    }
  }

  function allZero():void{
    for (let i = 0; i < boardArray.length; i++) {
      boardArray[i]=0;
    }
  }

  function backtrackingSolution():void{
    console.log(boardArray);
    let main:TreeNode = new TreeNode(0,false,false);
    let optionsOfValue:number[];
    let currentTreeNode:TreeNode = main;
    let lastAddedValue:TreeNode = main;
    let mustBeSet = new Set<number>();
    for (let i = 0; i < boardArray.length; i++) {
      if(boardArray[i]!=0) mustBeSet.add(i);
    }
    for (let i = 0; i < size*size; i++) {
      
      optionsOfValue = [1,2,3,4,5,6,7,8,9];
      // if(currentTreeNode!=undefined)
      optionsOfValue = differceFillOptionsOfValue(optionsOfValue, currentTreeNode.getValueOfChild());
      if(boardArray[i]!=0){
        lastAddedValue = new TreeNode(boardArray[i],true,true)
        currentTreeNode.addChild(lastAddedValue);
        currentTreeNode = lastAddedValue;
        console.log('must be: ' + i + ' : ' + boardArray[i]);
        // console.log(i + "\t" + boardArray[i]);
      }
      else{
        do{
          if(optionsOfValue.length == 0){
            boardArray[i] = 0;
            while (currentTreeNode.mustBe){
              currentTreeNode = currentTreeNode.parent!;
              i--;
              console.log('while')
            }
            i--;
            boardArray[i] = 0;
            currentTreeNode = currentTreeNode.parent!;
            //console.log(currentTreeNode);
            // console.log('aboba');
            break;
          }
          let randomNumber:number = Math.floor(Math.random()*(optionsOfValue.length));
          let randomValue:number = optionsOfValue[randomNumber];
          optionsOfValue.splice(randomNumber,1);
          boardArray[i] = randomValue;
          if(randomValue!=0){
            lastAddedValue = new TreeNode(randomValue,true,false);
            currentTreeNode.addChild(lastAddedValue);
          }
        }while (!checkBoard(boardArray,size)&&boardArray[i]!=0);
        if(boardArray[i]!=0&&optionsOfValue.length != 0) currentTreeNode = lastAddedValue;
        else i--;
      }
      console.log(boardArray[i] + ' : ' + i);
      // console.log(boardArray[i]);
    }
  }


  function differceFillOptionsOfValue(array:number[], hashset:Set<number>):number[]{
    if(hashset == undefined) return array;
    hashset.forEach( (item) =>{
      if(array.indexOf(item) != -1)array.splice(array.indexOf(item),1)
    })
    return array;
  }

  class TreeNode{
    child: Set<TreeNode>;
    parent?: TreeNode;
    value: number;
    valueOfAllChild: Set<number>;
    mustBe: boolean;
    constructor(value:number, parentExist:boolean, mustBe:boolean){
      this.value = value;
      this.child = new Set();
      this.valueOfAllChild = new Set<number>();
      if(parentExist) this.parent = new TreeNode(0,false,false);
      this.mustBe = mustBe;
    }
    addChild(child:TreeNode){
      this.child.add(child);
      child.parent = this;
      this.valueOfAllChild.add(child.value);
    }
    addValueOfChild(value:number){
      this.valueOfAllChild.add(value);
    }
    getValueOfChild():Set<number>{
      return this.valueOfAllChild;
    }
  }