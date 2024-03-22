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

    document.getElementById("startBtn").addEventListener("click", function () {

        document.getElementById("startBtn").disabled = true;
        document.getElementById("cleanBtn").disabled = true;
        
        stopSequence = false;
        visitedPositions.clear(); 
        moveCount = 0; 

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

                if (moveCount === 64) {
                    stopSequence = true;
                    return;
                }
            }

            setTimeout(() => {
                moveKnightToPosition(positionIndex + 1); 
            }, 500);
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


    function clearRouteTable() {
        const routeTable = document.getElementById("routeTable");
        routeTable.innerHTML = "";
        const marks = document.querySelectorAll(".cell-mark");
        marks.forEach(mark => {
            mark.parentNode.removeChild(mark);
        });
        document.getElementById("startBtn").disabled = false;
    }

    document.getElementById("stopBtn").addEventListener("click", function () {
        stopSequence = true; 
        document.getElementById("cleanBtn").disabled = false;
    });

    document.getElementById("cleanBtn").addEventListener("click", function () {
        clearRouteTable();
    });

});
