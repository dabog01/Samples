document.addEventListener("DOMContentLoaded", function () {
    const chessboard = new Chessboard("chessboard");
    let knight = new Knight("./images/knight.png", 0, 0);
    let route = new KnightRoute(knight);
    const dragDrop = new DragDrop(document.getElementById("chessboard"), knight.knight);

    dragDrop.setKnightMoveCallback(() => {
        knight.printPosition(); // Callback para imprimir la nueva posición
    });

    let stopSequence = false;
    let visitedPositions = new Set();
    let moveCount = 0;
    let moveSpeed = 1; // Inicializamos la velocidad de movimiento del caballo
    let boardValues = []; // Para mantener un registro de los valores de cada posición del tablero

    document.getElementById("startBtn").addEventListener("click", function () {

        document.getElementById("startBtn").disabled = true;
        document.getElementById("cleanBtn").disabled = true;

        stopSequence = false;
        visitedPositions.clear();
        boardValues = []; // Limpiamos el registro de los valores del tablero al iniciar una nueva secuencia

        const currentPosition = knight.getCurrentPosition();
        route = new KnightRoute(knight);
        const positions = route.generatePositions(currentPosition.row, currentPosition.col);

        function moveKnightToPosition(positionIndex) {
            if (stopSequence) {
                return;
            }

            const position = positions[positionIndex];
            const positionKey = `${position[0]},${position[1]}`;

            if (!visitedPositions.has(positionKey)) {

                visitedPositions.add(positionKey);
                knight.moveTo(position[0], position[1]);

                chessboard.markCell(position[0], position[1], moveCount + 1);

                moveCount++;

                addPositionToRouteTable(moveCount, position[0], position[1]);

                // Guardamos el valor de la posición en el registro del tablero
                boardValues[position[0]] = boardValues[position[0]] || [];
                boardValues[position[0]][position[1]] = moveCount;

                if (moveCount === 64) {
                    calculateSumOfDigits(boardValues);
                    stopSequence = true;
                    document.getElementById("stopBtn").disabled = true; // Desactivar el botón stopBtn al finalizar el evento
                    document.getElementById("cleanBtn").disabled = false;
                    return;
                }

            }

            setTimeout(() => {
                moveKnightToPosition(positionIndex + 1);
            }, moveSpeed);
        }

        moveKnightToPosition(0);
    });


    function addPositionToRouteTable(move, row, col) {
        const routeTable = document.getElementById("routeTable");
        const columnLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

        const newRow = routeTable.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        cell1.textContent = `${move}`;
        cell2.textContent = `${columnLetters[col]}`;
        cell3.textContent = `${row + 1}`;
    }

    function calculateSumOfDigits(boardValues) {
        const sums = {
            rows: [],
            cols: []
        };

        for (let row = 0; row < 8; row++) {
            let sum = 0;
            for (let col = 0; col < 8; col++) {
                sum += parseInt(boardValues[row][col]);
            }
            sums.rows.push(sum);
        }

        for (let col = 0; col < 8; col++) {
            let sum = 0;
            for (let row = 0; row < 8; row++) {
                sum += parseInt(boardValues[row][col]);
            }
            sums.cols.push(sum);
        }

        console.log("Rows Sum:", sums.rows);
        console.log("Cols Sum:", sums.cols);
    }

    function clearRouteTable() {
        const routeTable = document.getElementById("routeTable");
        routeTable.innerHTML = "";
        const marks = document.querySelectorAll(".cell-mark");
        marks.forEach(mark => {
            mark.parentNode.removeChild(mark);
        });
        document.getElementById("startBtn").disabled = false;
        moveCount = 0; // Reiniciamos el contador de movimientos
    }

    document.getElementById("speedSlider").addEventListener("input", function () {
        moveSpeed = parseInt(this.value); // Actualizamos la velocidad de movimiento
        document.getElementById("speedValue").textContent = moveSpeed; // Actualizamos el valor mostrado
    });


    document.getElementById("stopBtn").addEventListener("click", function () {
        stopSequence = true;
        document.getElementById("cleanBtn").disabled = false;
    });

    document.getElementById("cleanBtn").addEventListener("click", function () {
        clearRouteTable();
        document.getElementById("stopBtn").disabled = false;
        document.getElementById("startBtn").disabled = false;
    });
});
