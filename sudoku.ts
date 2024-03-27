export module sudoku{
  export let boardArray = new Array<number>(81);

  function checkBoard(board:number[], size:number):boolean{
    for (let i = 0, conuterI = 1; i < size; i+=3, conuterI++) {
      let numbersCheck = new Array<number>(9);
      for (let j = 0, counterJ = 1; j < size; j++, counterJ++) {
        numbersCheck[board[i+j]]++;
        if(counterJ%3==0) counterJ+=size - 3;
      }
      checkArrayOneOne(numbersCheck);
      if(conuterI%3==0) i+=18;
    }
    return true;
  }

  function checkArrayOneOne(checkBoard:number[]):boolean{
    for (let i = 0; i < checkBoard.length; i++) {
      if(checkBoard[i]==1) return false;
    }
    return true;
  }

  export function checkAlgoritm(size:number):void{
    let counter:number = 1;
    for (let i = 0, conuterI = 1; i < size; i+=3, conuterI++) {
      for (let j = 0, counterJ = 1; j < size; j++, counterJ++) {
        document.getElementById(`cell${i+j}`)!.innerText = counter + "";
        counter++;
        if(counterJ%3==0) counterJ+=size - 3;
      }
      if(conuterI%3==0) i+=18;
    }
  }
}