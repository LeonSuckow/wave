const boardWidth = 20;
const boardHeight = 20;

class Board {
  constructor(bgColor = 'bg-gray-800') {
    this.board = document.createElement('div');
    this.board.className = `${bgColor} grid gap-4 `;
    this.data = [];
    document.body.appendChild(this.board); // Adicionando o elemento this.board ao corpo do documento
  }

  startPropagation(row, col, propagationStart = 1) {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    let propagationCount = propagationStart;

    let firstColumn = col - propagationCount;
    let lastColumn = col + propagationCount;

    let firstRow = row - propagationCount;
    let lastRow = row + propagationCount;

    for (let i = firstRow; i < boardHeight; i++) {
      if (i < 0 || i > lastRow) continue
      this.data[i] = this.data[i].map((rowElement, columnIndex) => {
        let betweenInvalidColumns = columnIndex < firstColumn || columnIndex > lastColumn;
        let isClickedElement = i === row && columnIndex === col;

        if (betweenInvalidColumns || isClickedElement) return rowElement;

        if (i === firstRow || i === lastRow) {
          // rowElement.style.background = `cyan`;
          rowElement.classList.add('waveAnimation');
        }

        if (columnIndex === firstColumn || columnIndex === lastColumn) {
          // rowElement.style.background = `cyan`;
          rowElement.classList.add('waveAnimation');
        }
        return rowElement;
      })
    }

    if (propagationCount < boardWidth) {
      setTimeout(() => {
        this.startPropagation(row, col, propagationCount + 1)
      }, 50);
    }

  }
  addBoardItem(bgColor, row, col) {
    let newItem = document.createElement('div');
    newItem.className = `${bgColor} p-4 w-4 h-4 flex items-center justify-center text-white`;
    newItem.setAttribute('data-value', 0);
    newItem.innerHTML = parseInt(newItem.getAttribute('data-value'));
    newItem.addEventListener('click', () => {
      let dataValue = parseInt(newItem.getAttribute('data-value'));
      newItem.setAttribute('data-value', dataValue + 1);
      newItem.innerHTML = dataValue + 1
      this.startPropagation(row, col)
    })
    newItem.addEventListener('animationend', () => {
      newItem.classList.remove('waveAnimation');
    })
    return newItem;
  }


  setBoardItem(row, col, value) {
    let element = this.data[row][col];

    if (element) {
      this.data[row][col].innerHTML = value;
    }
  }
  getBoardItem(row, col) {
    return this.data[row][col];
  }

  renderMatriz(rows, columns) {
    this.board.className += `grid-cols-[repeat(${columns},1fr)] grid-rows-[repeat(${rows},1fr)]`

    for (let i = 0; i < rows; i++) {
      this.data[i] = []; 0
      for (let j = 0; j < columns; j++) {
        this.data[i][j] = this.addBoardItem('bg-gray-800', i, j);
        let element = this.data[i][j]

        this.board.appendChild(element);
      }
    }
  }
}

let board = new Board()
board.renderMatriz(boardWidth, boardHeight);
