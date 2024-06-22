main();

function main() {
  expect([1,2,3,4,5,2], [2,2,4]);
  expect([7,8,1,0,2,5], [0,2,8]);
  expect([11,13,15], []);
}

const expect = (testArg, toBe) => {
  const result = onlyEvens(testArg);
  if (!isArrayEqual(result, toBe)) {
    console.error(`Expected onlyEvens([${testArg}]) == [${toBe}], got [${result}]`);
  }
}

function isArrayEqual(a, b) {
  return a.length == b.length && a.every((ele, i) => ele == b[i]);
}

function onlyEvens(integers) {
  return integers.filter(isEven).toSorted((a, b) => a - b);
}

function isEven(num) {
  return (num & 1) == 0;
}