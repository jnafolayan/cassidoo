main();

function main() {
  printArrow('right', 3);
  printArrow('left', 5);
  printArrow('up', 2);
}

function printArrow(direction, n) {
  // Generate a right-facing grid as the starting grid.
  const rows = n * 2 - 1;
  const cols = n;
  let grid = Array.from({ length: rows }).map(() => new Array(cols).fill(' '));
  for (let i = 0; i < cols; i++) {
    grid[i][i] = '*';
    grid[rows-i-1][i] = '*';
  }
  
  // Rotate the starting grid x amount of times, where x is the number of rotations
  // needed to make the right arrow face the desired direction. If the desired 
  // direction in right, we don't need to rotate (rotation count = -1 + 1 = 0). 
  grid = rotate(grid, ["down", "left", "up"].indexOf(direction) + 1);

  // Print!
  console.log(grid.map(row => row.join('')).join("\n"));
}

function rotate(grid, count=1) {
  if (count == 0) return grid.slice().map((row) => row.slice());

  const rows = grid.length;
  const cols = grid[0].length;
  const g = Array.from({ length: cols }).map(() => new Array(rows).fill(' '));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      g[j][rows-i-1] = grid[i][j];
    }
  }

  return count > 1 ? rotate(g, count - 1) : g;
}