const BLOCK_BOARD = {
  0: [],
  1: [1, 2],
  2: [1, 2],
  3: [],
};

const BLINKER_BOARD = {
  0: [],
  1: [2],
  2: [2],
  3: [2],
  4: [],
};

const GLIDER_BOARD = {
  0: [1],
  1: [2],
  2: [0, 1, 2],
  3: [],
};

// Implement the Game of Life here to transform the inputBoard into the outputBoard!
function getNextGeneration(inputBoard) {
  // Setup Variables
  const tempBoard = {}; // keeping a temporary board to use to repopulate inputBoard later
  let rows = Object.keys(inputBoard);
  rows = rows.map((row) => Number(row)); // we need numbers
  let deadTouched = {};

  const addToNeighbors = (pair, current) => {
    // Out of bounds?
    if (
      pair[0] < 0 ||
      pair[0] > rows.length - 1 ||
      pair[1] < 0 ||
      pair[1] > rows.length - 1
    ) {
      return false;
    }
    // is it our current live cell
    if (current[0] === pair[0] && current[1] === pair[1]) {
      return false;
    }
    return true;
  };

  // First assess all possible neighbors
  rows.forEach((row) => {
    //
    let tempRow = [];
    inputBoard[row].forEach((col) => {
      let liveNeighborCount = 0;
      // Here we are looking through all neighbors (9x9 square)
      // Going through row by row
      for (let i = row - 1; i <= row + 1; i++) {
        // Going through colum by column
        for (let j = col - 1; j <= col + 1; j++) {
          // If pair isn't current cell or out of bounds
          if (addToNeighbors([i, j], [row, col])) {
            // If neighbor is life keep track
            if (inputBoard[i].includes(j)) {
              liveNeighborCount++;
            }
            // If neighbor is dead and first time start counter
            else if (!deadTouched[[i, j]]) {
              deadTouched[[i, j]] = 1;
              // if neighbor is dead add to counter
            } else {
              deadTouched[[i, j]] += 1;
            }
          }
        }
      }

      // See if live cell continues as live after looking at neighbors
      // Any live cell with fewer than two live neighbors dies
      // Any live cell with two or three live neighbors lives on
      // Any live cell with more than three live neighbors dies
      if (liveNeighborCount === 2 || liveNeighborCount === 3) {
        // populating temporary row
        tempRow.push(col);
      }
    });
    // populating temporary board so we can have all correct Live cells
    tempBoard[row] = tempRow;
  });

  // Go back and take temporary board and put it into inputboard
  for (let row in tempBoard) {
    inputBoard[row] = tempBoard[row];
  }

  // Go through dead cells to see which turn live
  // Any dead cell with exactly three live neighbors becomes a life cell
  for (let pair in deadTouched) {
    if (deadTouched[pair] === 3) {
      inputBoard[pair[0]].push(Number(pair[2]));
      inputBoard[pair[0]] = inputBoard[pair[0]].sort();
    }
  }

  return inputBoard;
}

console.log('Block Board');
console.log(BLOCK_BOARD);
console.log(getNextGeneration(BLOCK_BOARD));
console.log('Blinker Board');
console.log(BLINKER_BOARD);
console.log(getNextGeneration(BLINKER_BOARD));
console.log('Glider Board');
console.log(GLIDER_BOARD);
console.log(getNextGeneration(GLIDER_BOARD));