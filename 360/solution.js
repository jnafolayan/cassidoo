main();

function main() {
  expect([1, 0, 0, 0, 1], 1, true);
  expect([1, 0, 0, 0, 1], 2, false);
  expect([0, 0, 0, 0, 0], 3, true);
  expect([1, 0, 1, 0, 1], 1, false);
  
  // Extra cases
  expect([0, 0, 0], 2, true);
  expect([0], 1, true);
  expect([0], 3, false);
}

function expect(field, k, expected) {
  const actual = canPlantFlowers(field, k);
  if (actual != expected) {
    console.error(`Expected canPlantFlowers([${field}]) == ${expected}, got ${actual}`);
  }
}

function canPlantFlowers(field, k) {
  const PLANT = 1;
  const SOIL = 0;

  // Clone the array
  field = field.slice();
  let i = 0;
  let cur;
  while (i < field.length && k > 0) {
    cur = field[i];
    if (cur == PLANT) {
      i++;
      continue;
    }
    if (cur == SOIL && 
      (i == 0 || field[i-1] == SOIL) && 
      (i+1 == field.length || field[i+1] == SOIL)) {
      field[i] = PLANT;
      k--;
    }
    i++;
  }

  return k == 0;
}