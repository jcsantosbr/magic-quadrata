// const board = document.getElementById("board");
// const ctx = board.getContext('2d');
// console.log(ctx);

// colors = [ "yellow", "red", "blue", "orange", "pink", " ]

// ctx.fillStyle = "green";
// ctx.fillRect(0, 0, 100, 100);

const colors = [
    "yellow", "blue", "orange",
    "red", "green", "white",
    "brown", "purple", "gray"
  ];
  
  const board = [
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
  ];
  
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  const createTableBoard = (document, board, callbackFn) => {
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
        btn.style.background = colors[cell];
        btn.onclick = () => { callbackFn(x, y, board, tableBoard); }
        //btn.innerText = x + "," + y;
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
  
    tableBoard[x - 1][y - 1].style.background = colors[board[x - 1][y - 1]];
    tableBoard[x - 1][y - 0].style.background = colors[board[x - 1][y - 0]];
    tableBoard[x - 1][y + 1].style.background = colors[board[x - 1][y + 1]];
    tableBoard[x - 0][y + 1].style.background = colors[board[x - 0][y + 1]];
    tableBoard[x + 1][y + 1].style.background = colors[board[x + 1][y + 1]];
    tableBoard[x + 1][y - 0].style.background = colors[board[x + 1][y - 0]];
    tableBoard[x + 1][y - 1].style.background = colors[board[x + 1][y - 1]];
    tableBoard[x - 0][y - 1].style.background = colors[board[x - 0][y - 1]];
  }
  
  const startBoard = (tableBoard, iterations) => {
  
    for(let i = 0; i < iterations; i++) {
      x = randomIntFromInterval(1, tableBoard.length - 2);
      y = randomIntFromInterval(1, tableBoard.length - 2);
      tableBoard[x][y].onclick();
    }  
  }
  
  const printPos = (x, y, board, tableBoard) => {
    console.log("x: " + x + ", y: " + y);
    tableBoard[x][y].style.background = "#123456";
  }
  
  const tableBoard = createTableBoard(document, board, processClick);
  
  startBoard(tableBoard, 100);
  
  
  
  