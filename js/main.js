const canvas = document.getElementById("canvas"),
      ctx = canvas.getContext("2d"),
      statusbar = document.getElementById("statusbarhold");

let gridSize = 6,
    gridDistance = {},
    gridPos = {},
    gridStone = {},
    stoneCount = 0,
    monsterPos = [],
    lastPos = [0, 0, 0],
    stoneRand = 6,
    isGameOver = false;      
    

function setStatusText() {
    statusbar.innerText = `Size : ${gridSize}\nInitial stone : ${stoneRand}\n`;
    statusbar.innerText += `Stone count : ${stoneCount}\n`;
}

function settingGrid(pos) {
    const coordinate = pos;
    pos = hexagonalCoordinate(pos);
    gridPos[coordinate] = pos;
    gridStone[coordinate] = 0;
    gridDistance[coordinate] = gridSize - Math.max(...coordinate.map(x => Math.abs(x)));
}

function monsterMove() {
    let aroundPos = findAroundPos(monsterPos).filter(x => !gridStone[x]);
    if (!aroundPos.length) {
        win();
        return;
    }
    let minDis = Math.min(...aroundPos.map(x => gridDistance[x]));
    aroundPos = aroundPos.filter(x => gridDistance[x] == minDis);

    drawGrid(monsterPos);
    monsterPos = aroundPos[rand(aroundPos.length)];

    drawMonster(monsterPos);

    if (!gridDistance[monsterPos]) 
        lost();
}

function calculateDis(pos) {
    let aroundPos = findAroundPos(pos).filter(x => !gridStone[x] && gridDistance[x]);

    for (let pos of aroundPos) {
        let aroundPos = findAroundPos(pos).filter(x => !gridStone[x]);
        if (!aroundPos.length)
            return;
        let minDis = Math.min(...aroundPos.map(x => gridDistance[x])) + 1;
        if (minDis == gridSize * gridSize)
            return;
        if (minDis > gridDistance[pos]) {
            gridDistance[pos] = minDis;
            calculateDis(pos);
        }
    }
}

function randStone() {
    for (let i = 0; i < stoneRand; i++) {
        let posList = Object.keys(gridPos).filter(x => !gridStone[x]);
        let pos = posList[rand(posList.length)].split(',').map(x => parseInt(x));
        while (pos[0] == monsterPos[0] && pos[1] == monsterPos[1] && pos[2] == monsterPos[2])
            pos = posList[rand(posList.length)].split(',').map(x => parseInt(x));
    
        gridStone[pos] = 1;
        drawStone(pos, 1);
        calculateDis(pos);
    }
}

function lost() {
    isGameOver = true;
    setStatusText();
    statusbar.innerText += "You lost";
}

function win() {
    isGameOver = true;
    setStatusText();
    statusbar.innerText += "You Win";
}

function newGame() {
    canvas.width = gridR * Math.sqrt(3) * 2 * gridSize + gridR * 3;
    canvas.height = gridR * 4 * gridSize + gridR * 3;
    statusbar.style.width = canvas.width + "px";

    ctx.fillStyle = color["BG"];
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    gridPos = {};  
    gridStone = {};
    stoneCount = stoneRand;
    monsterPos = [0, 0, 0];
    isGameOver = false;
    
    drawMap();
    drawMonster(monsterPos);
    randStone();
    setStatusText();
}

newGame();