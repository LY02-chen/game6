function drawHexagon(pos, color, len) {  
    pos = hexagonalCoordinate(pos);
    ctx.fillStyle = color;
    let degreeOffset = 1 / 30;
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], len, Math.PI * (-degreeOffset), Math.PI * degreeOffset);
    for (let i = 1; i < 6; i++) {
        let degreeStart = Math.PI * (i / 3 - degreeOffset);
        let degreeEnd = Math.PI * (i / 3 + degreeOffset);
        ctx.lineTo(polar(pos, degreeStart, len)[0], polar(pos, degreeStart, len)[1]);
        ctx.arc(pos[0], pos[1], len, degreeStart, degreeEnd);
    }
    ctx.closePath();
    ctx.fill();
}

function drawGrid(pos) {
    drawHexagon(pos, color["BG"], gridR * 1.1);
    drawHexagon(pos, color["frame"], gridR);
    drawHexagon(pos, color["solid"], gridR * 0.8);
    if (true) {
        ctx.font = `${gridR * 0.6}px Comic Sans MS`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "black";    
        ctx.fillText(`${gridDistance[pos]}`, hexagonalCoordinate(pos)[0], hexagonalCoordinate(pos)[1]);
    }
}

function drawMap() {
    for (let x = -gridSize; x <= gridSize; x++) {
        let y = x >= 0 ? -gridSize : -gridSize - x;
        for (; y <= (x <= 0 ? gridSize : gridSize - x); y++) {
            let z = -x - y;
            if (z <= gridSize && z >= -gridSize) {
                settingGrid([x, y, z]);
                drawGrid([x, y, z]);
            }
        }       
    }
}

function drawStone(pos, alpha) {
    const hexToRgbA = (color) => {
        color = "0x" + color.substring(1);
        return `rgba(${[(color>>16)&255, (color>>8)&255, color&255].join(',')},${alpha})`;
    }
    drawHexagon(pos, hexToRgbA(color["stoneFrame"]), gridR * 0.9);
    drawHexagon(pos, hexToRgbA(color["stoneSolid"]), gridR * 0.7);
}

function drawMonster(pos) {
    pos = hexagonalCoordinate(pos);
    ctx.fillStyle = color["monster"];
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], gridR, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}