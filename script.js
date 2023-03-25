const allColors = [
  "Gold", 
  "LightBlue", 
  "Peru", 
  "LightGreen",
  "Pink",
  "DarkGray",
  "Orange",
  "Red",
  "Orchid",
  "Tomato",
  "PaleGoldenRod",
  "GreenYellow",
  "DeepSkyBlue",
  "Turquoise",
  "BlueViolet",
  "MintCream"
]

function createColors(size) {
  const result = allColors.slice(0, size * size);
  console.log(result);
  return result;
}

function generateNewBoard(size) {

    const rows = size;
    const cells = size;
    let newBoard = [];
    let item = 0;
    for(let r = 0; r < rows; r++) {
      newBoard.push([]);
      newBoard.push([]);
      newBoard.push([]);
      for(let c = 0; c < cells; c++) {
        for(let i = 0; i < 3; i++) {
          newBoard[3 * r + 0].push(item);
          newBoard[3 * r + 1].push(item);
          newBoard[3 * r + 2].push(item);  
        }
        item++;
      }
    } 
    return newBoard;
  }

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const createTableBoard = (document, board, colors, callbackFn) => {
  const table = document.getElementById('table-board');

  let tableBoard = [];

  board.forEach((row, x) => {
    const tr = document.createElement('tr');
    table.appendChild(tr);
    const rowBoard = [];
    tableBoard.push(rowBoard)
    row.forEach((cell, y) => {
      const td = document.createElement('td');
      tr.appendChild(td);
      const btn = document.createElement('button');
      
      btn.onclick = () => { callbackFn(x, y, board, tableBoard); }
      
      btn.style.background = colors[cell];
      // btn.innerText = x + "," + y;
      if (y % 3 === 0) {
        btn.style.borderLeft = "solid #000000"
      } else if (y % 3 === 2) {
        btn.style.borderRight = "solid #000000"
      }
      if (x % 3 === 0) {
        btn.style.borderTop = "solid #000000"
      } else if (x % 3 === 2) {
        btn.style.borderBottom = "solid #000000"
      }
      
      td.appendChild(btn);
      rowBoard.push(btn)
    });
  });
  return tableBoard;
}



const processClick = (x, y, board, tableBoard) => {
  if (x == 0 || y == 0) return;
  if (x == board.length - 1 || y == board.length - 1) return;
  console.log("x: " + x + ", y: " + y);
  let firstValue = board[x - 1][y - 1];
  let secondValue = board[x - 1][y - 0];
  board[x - 1][y - 1] = board[x - 1][y + 1];
  board[x - 1][y - 0] = board[x - 0][y + 1];
  board[x - 1][y + 1] = board[x + 1][y + 1];
  board[x - 0][y + 1] = board[x + 1][y - 0];
  board[x + 1][y + 1] = board[x + 1][y - 1];
  board[x + 1][y - 0] = board[x - 0][y - 1];
  board[x + 1][y - 1] = firstValue;
  board[x - 0][y - 1] = secondValue;

  let firstStyle = copyStyleFrom({}, tableBoard[x - 1][y - 1].style);
  let secondStyle = copyStyleFrom({}, tableBoard[x - 1][y - 0].style);
  copyStyleFrom(tableBoard[x - 1][y - 1].style, tableBoard[x - 1][y + 1].style);
  copyStyleFrom(tableBoard[x - 1][y - 0].style, tableBoard[x - 0][y + 1].style);
  copyStyleFrom(tableBoard[x - 1][y + 1].style, tableBoard[x + 1][y + 1].style);
  copyStyleFrom(tableBoard[x - 0][y + 1].style, tableBoard[x + 1][y - 0].style);
  copyStyleFrom(tableBoard[x + 1][y + 1].style, tableBoard[x + 1][y - 1].style);
  copyStyleFrom(tableBoard[x + 1][y - 0].style, tableBoard[x - 0][y - 1].style);
  copyStyleFrom(tableBoard[x + 1][y - 1].style, firstStyle);
  copyStyleFrom(tableBoard[x - 0][y - 1].style, secondStyle);
  
}

function copyStyleFrom(toStyle, fromStyle) {
  toStyle.background = fromStyle.background || "";
  toStyle.borderLeft = fromStyle.borderLeft || "";
  toStyle.borderRight = fromStyle.borderRight || "";
  toStyle.borderTop = fromStyle.borderTop || "";
  toStyle.borderBottom = fromStyle.borderBottom || "";
  return toStyle;
}

function startBoard(tableBoard, iterations, timeout) {
  if (iterations <= 0) {
    return;
  }
  setTimeout(() => { 
    randomClick(tableBoard);
    startBoard(tableBoard, iterations - 1);
  }, timeout);
}  

const randomClick = (tableBoard) => {
  x = randomIntFromInterval(1, tableBoard.length - 2);
  y = randomIntFromInterval(1, tableBoard.length - 2);
  tableBoard[x][y].onclick();
  tableBoard[x][y].onclick();
  tableBoard[x][y].onclick();
}


const size = 2;
const colors = createColors(size);
const mainBoard = generateNewBoard(size);
const tableBoard = createTableBoard(document, mainBoard, colors, processClick);
const iterations = 5;
const timeout = 5000 / iterations;

const btnStart = document.getElementById("btnStartGame");


btnStart.onclick = () => {
  startBoard(tableBoard, iterations, timeout);
};


