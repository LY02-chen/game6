document.getElementById("applysetting").onclick = function(event) {
    let inputSize = parseInt(document.getElementById("size").value);
    let inputRand = parseInt(document.getElementById("stonerand").value);
    
    if (!inputSize) {
        alert("The size must be greater than zero.");
        return;
    }
    if (inputRand >= 3 * inputSize * (inputSize + 1) + 1) {
        alert("The number of initial stone is to many.");
        return;
    }

    gridSize = inputSize;
    stoneRand = inputRand;
    
    newGame();
    if (stoneRand == 3 * inputSize * (inputSize + 1)) 
        win();
}

document.getElementById("new").onclick = newGame;