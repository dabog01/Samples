class Knight {
    constructor(imageSrc, initialRow, initialCol) {
        this.knight = document.createElement("img");
        this.knight.src = imageSrc;
        this.knight.classList.add("knight");
        this.knight.draggable = true;
        this.knight.addEventListener("dragstart", this.dragStart.bind(this));
        this.moveTo(initialRow, initialCol);
    }

    moveTo(row, col) {
        const cell = document.querySelector(
            `[data-row="${row}"][data-col="${col}"]`
        );
        cell.appendChild(this.knight);
        this.printPosition();
    }

    dragStart(event) {
        event.dataTransfer.setData("text/plain", "");
    }

    getCurrentPosition() {
        const cell = this.knight.closest('.cell');
        if (cell) {
            return {
                row: parseInt(cell.dataset.row),
                col: parseInt(cell.dataset.col)
            };
        } else {
            return { row: 0, col: 0 };
        }
    }

    printPosition() {
        const currentPosition = this.getCurrentPosition();
        console.log("New Posición:", currentPosition);
    }
}