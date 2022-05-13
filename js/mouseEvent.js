window.addEventListener("mousemove", move, false);
window.addEventListener("mousedown", down, false);
window.addEventListener("mouseup", up, false);

const getMousePos = (x, y) => {
    let rect = canvas.getBoundingClientRect();
    x -= rect.left + window.scrollX;
    y -= rect.top + window.scrollY;
    
    return [x, y];
}

function move(event) {
    let pos = getMousePos(event.pageX, event.pageY);
    for (let [key, value] of Object.entries(gridPos)) {
        let x = value[0] - pos[0];
        let y = value[1] - pos[1];
        
        let dis = Math.sqrt(x * x + y * y);
        if (dis < gridR) {
            key = key.split(',');
            pos = key.map(x => parseInt(x));

            if (pos[0] == monsterPos[0] && pos[1] == monsterPos[1] && pos[2] == monsterPos[2]) 
                return;
            
            if (gridStone[pos]) 
                return;

            if (!gridStone[lastPos] && (lastPos[0] != monsterPos[0] || lastPos[1] != monsterPos[1] || lastPos[2] != monsterPos[2])) 
                drawGrid(lastPos);
            
            lastPos = pos;
            drawGrid(pos);
            drawStone(pos, 0.3);
            return;
        }
    }
    if (!gridStone[lastPos] && (lastPos[0] != monsterPos[0] || lastPos[1] != monsterPos[1] || lastPos[2] != monsterPos[2])) 
        drawGrid(lastPos);
}

function down(event) {
    if (event.button != 0) 
        return;

    window.removeEventListener("mousemove", move, false);
    let pos = getMousePos(event.pageX, event.pageY);
    let x = gridPos[lastPos][0] - pos[0];
    let y = gridPos[lastPos][1] - pos[1];

    let dis = Math.sqrt(x * x + y * y);
    if (dis < gridR) {
        gridStone[lastPos] = 1;
        drawStone(lastPos, 1);
        monsterMove();
        calculateDis(lastPos);
        return;
    }
}

function up(event) {
    window.addEventListener("mousemove", move, false);
}