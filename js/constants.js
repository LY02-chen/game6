const color = {
    "BG": "#ccff80",
    "frame": "#d26900",
    "solid": "#ffdcb9",
    "stoneFrame": "#6c6c6c",
    "stoneSolid": "#bebebe",
    "monster": "#8600ff",
    "horn": "#000000",
    "eye": "#ffffff",
    "mouth": "#ffffff",
}

const gridR = 20,
      xDegree = Math.PI * 5 / 6,
      yDegree = Math.PI / 6,
      zDegree = Math.PI * 3 / 2;

const rand = (n) => Math.floor(Math.random() * n)
      
const step = [[1, 0, -1], [0, 1, -1], [-1, 1, 0],
              [-1, 0, 1], [0, -1, 1], [1, -1, 0]];

const polar = (pos, degree, len) => [pos[0] + Math.cos(degree) * len, 
                                     pos[1] + Math.sin(degree) * len]

const hexagonalCoordinate = ([x, y, z]) => {
    z += x + y;
    x += y;
    let pos = [canvas.width / 2, canvas.height / 2];
    pos = polar(pos, xDegree, gridR * 2 * x);
    pos = polar(pos, yDegree, gridR * 2 * y);
    pos = polar(pos, zDegree, gridR * 2 * z);
    return pos;
}

const inGrid = (pos) => {
    return pos[0] >= -gridSize && pos[0] <= gridSize &&
           pos[1] >= -gridSize && pos[1] <= gridSize &&
           pos[2] >= -gridSize && pos[2] <= gridSize;
}

const findAroundPos = (pos) => {
    let result = [];

    for (let i in step) {
        let sidePos = pos.map((x, index) => x + step[i][index]);
        if (inGrid(sidePos)) 
            result.push(sidePos);
    }

    return result;
}
