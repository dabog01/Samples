class Chessboard {
    constructor(elementId) {
        this.chessboard = document.getElementById(elementId);
        this.createCells();
    }

    createCells() {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell", (row + col) % 2 === 0 ? "white" : "black");
                cell.dataset.row = row;
                cell.dataset.col = col;
                this.chessboard.appendChild(cell);
            }
        }
    }

    markCell(row, col, move) {
        const cell = this.getCellElement(row, col);
        if (cell) {
            const mark = document.createElement("div");
            mark.classList.add("cell-mark");
            mark.textContent = move;
            cell.appendChild(mark);
        }
    }

    getCellElement(row, col) {
        return this.chessboard.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    }
}