class KnightTour {
    constructor() {
        this.chessBoard = Array.from({ length: 8 }, () => Array(8).fill(0));
        this.deltax = [2, 1, -1, -2, -2, -1, 1, 2];
        this.deltay = [1, 2, 2, 1, -1, -2, -2, -1];
    }

    isAvailableNeighbor(x, y, board) {
        return x >= 0 && y >= 0 && x < 8 && y < 8 && board[x][y] === 0;
    }

    getAvailableNeighbors(x, y, board) {
        let count = 0;
        for (let i = 0; i < 8; i++) {
            const nextx = x + this.deltax[i];
            const nexty = y + this.deltay[i];
            if (this.isAvailableNeighbor(nextx, nexty, board)) {
                count++;
            }
        }
        return count;
    }

    getNextMove(x, y, board) {
        const moves = [];
        for (let i = 0; i < 8; i++) {
            const nextx = x + this.deltax[i];
            const nexty = y + this.deltay[i];
            if (this.isAvailableNeighbor(nextx, nexty, board)) {
                const count = this.getAvailableNeighbors(nextx, nexty, board);
                const deltaX = Math.abs(nextx - x);
                const deltaY = Math.abs(nexty - y);
                const isLMove = (deltaX === 2 && deltaY === 1) || (deltaX === 1 && deltaY === 2);
                moves.push({ x: nextx, y: nexty, count, isLMove });
            }
        }

        moves.sort((a, b) => {
            if (a.count !== b.count) {
                return a.count - b.count;
            } else {
                return a.isLMove ? -1 : 1;
            }
        });

        return moves;
    }

    generatePositions(startx, starty) {
        let positions = [];
        let currentx = startx;
        let currenty = starty;

        for (let k = 0; k < 64; k++) {
            positions.push([currentx, currenty]);
            this.chessBoard[currentx][currenty] = k + 1;

            const nextMoves = this.getNextMove(currentx, currenty, this.chessBoard);
            if (nextMoves.length > 0) {
                const nextMove = nextMoves.shift();
                currentx = nextMove.x;
                currenty = nextMove.y;
            } else {
                break;
            }
        }

        return positions;
    }
}
