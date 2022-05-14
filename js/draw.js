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
    
    ctx.fillStyle = color["horn"];
    ctx.beginPath();
    ctx.moveTo(pos[0] + gridR * 0.5 * Math.cos(Math.PI * 16 / 9), 
               pos[1] + gridR * 0.5 * Math.sin(Math.PI * 16 / 9));
    ctx.lineTo(pos[0] + gridR * 0.75 * Math.cos(Math.PI * 15 / 9), 
               pos[1] + gridR * 0.75 * Math.sin(Math.PI * 15 / 9));
    ctx.lineTo(pos[0] + gridR * 0.4 * Math.cos(Math.PI * 14 / 9), 
               pos[1] + gridR * 0.4 * Math.sin(Math.PI * 14 / 9));
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(pos[0] + gridR * 0.5 * Math.cos(Math.PI * 11 / 9), 
               pos[1] + gridR * 0.5 * Math.sin(Math.PI * 11 / 9));
    ctx.lineTo(pos[0] + gridR * 0.75 * Math.cos(Math.PI * 12 / 9), 
               pos[1] + gridR * 0.75 * Math.sin(Math.PI * 12 / 9));
    ctx.lineTo(pos[0] + gridR * 0.4 * Math.cos(Math.PI * 13 / 9), 
               pos[1] + gridR * 0.4 * Math.sin(Math.PI * 13 / 9));
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = color["monster"];
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], gridR * 0.5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = color["eye"];
    ctx.beginPath();
    ctx.arc(pos[0] + gridR * 0.25 * Math.cos(Math.PI * 11 / 9),
            pos[1] + gridR * 0.25 * Math.sin(Math.PI * 11 / 9),
            gridR * 0.15, Math.PI * 11 / 9, Math.PI * 2 / 9, true);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(pos[0] + gridR * 0.25 * Math.cos(Math.PI * 16 / 9),
            pos[1] + gridR * 0.25 * Math.sin(Math.PI * 16 / 9),
            gridR * 0.15, Math.PI * 7 / 9, Math.PI * 16 / 9, true);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = color["mouth"];
    ctx.beginPath();
    ctx.arc(pos[0], pos[1] + gridR * 0.08, gridR * 0.25, 0, Math.PI);
    ctx.arc(pos[0], pos[1] - gridR * 0.1, 
            gridR * Math.sqrt(0.18 * 0.18 + 0.25 * 0.25), 
            Math.PI - Math.atan(0.18 / 0.25), 
            Math.atan(0.18 / 0.25), true);
    ctx.closePath();
    ctx.fill();
}