const canvas = document.getElementById("canvas"),
      ctx = canvas.getContext("2d");

let gridSize = 6,
    gridDistance = {},
    gridPos = {},
    gridStone = {},
    monsterPos = [],
    lastPos = [0, 0, 0],
    stoneRand = 6;      
    
function settingGrid(pos) {
    const coordinate = pos;
    pos = hexagonalCoordinate(pos);
    gridPos[coordinate] = pos;
    gridStone[coordinate] = 0;
    gridDistance[coordinate] = gridSize - Math.max(...coordinate.map(x => Math.abs(x)));
}

function monsterMove() {
    let aroundPos = findAroundPos(monsterPos).filter(x => !gridStone[x]);
    let minDis = Math.min(...aroundPos.map(x => gridDistance[x]));
    aroundPos = aroundPos.filter(x => gridDistance[x] == minDis);

    drawGrid(monsterPos);
    monsterPos = aroundPos[rand(aroundPos.length)];

    drawMonster(monsterPos);
}

function calculateDis(pos) {
    let aroundPos = findAroundPos(pos).filter(x => !gridStone[x] && gridDistance[x]);

    for (let pos of aroundPos) {
        let aroundPos = findAroundPos(pos).filter(x => !gridStone[x]);
        if (!aroundPos.length)
            return;
        let minDis = Math.min(...aroundPos.map(x => gridDistance[x])) + 1;
        if (minDis == gridSize * 2)
            return;
        if (minDis > gridDistance[pos]) {
            gridDistance[pos] = minDis;
            calculateDis(pos);
        }
    }
}

function randStone() {
    // for (let i = 0; i < stoneRand; i++) {
    //     let pos = gridPos;
    //     gridStone[pos] = 1;
    //     drawStone(pos, 1);
    //     calculateDis(pos);
    // }

    console.log(JSON.stringify(gridPos));

}

function newGame() {
    canvas.width = gridR * Math.sqrt(3) * 2 * gridSize + gridR * 3;
    canvas.height = gridR * 4 * gridSize + gridR * 3;

    ctx.fillStyle = color["BG"];
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    gridPos = {};  
    gridStone = {};
    monsterPos = [0, 0, 0];
    drawMap();
    drawMonster(monsterPos);
    randStone();
}

newGame();