class DragDrop {
    constructor(chessboardElement, knightElement) {
        this.chessboard = chessboardElement;
        this.knight = knightElement;
        this.chessboard.addEventListener("dragover", this.dragOver.bind(this));
        this.chessboard.addEventListener("drop", this.dropKnight.bind(this));
    }

    dragOver(event) {
        event.preventDefault();
    }

    dropKnight(event) {
        event.preventDefault();
        const cell = event.target.closest('.cell');
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        this.moveKnight(row, col);
    }

    moveKnight(row, col) {
        const cell = document.querySelector(
            `[data-row="${row}"][data-col="${col}"]`
        );
        cell.appendChild(this.knight);
        this.knightMoveCallback(); // Llamada al callback para imprimir la nueva posición
    }

    setKnightMoveCallback(callback) {
        this.knightMoveCallback = callback;
    }
}
