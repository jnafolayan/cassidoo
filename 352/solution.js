main();

function main() {
  expect([2, 4, 1, 3, -5, 6], 72);
  // Extra tests
  expect([3, 1, 8, 0, -3,-5], 120);
  expect([3, 1, 8, 0, -3, 6], 144);
}

function expect(args, expected) {
  const result = maxProduct(args);
  if (result != expected) {
    console.error(`Expected maxProduct(${args.join(", ")}) == ${expected}, got ${result}`);
  }
}

function maxProduct(list) {
  const sorted = list.toSorted();
  const n = sorted.length;
  // Grab the first two minimum values and the last. The first two might be large
  // negative values.
  const [a, b, c] = [sorted[0], sorted[1], sorted[n-1]];
  // Grab the last two maximum values.
  const [x, y, z] = [sorted[n-3], sorted[n-2], sorted[n-1]];
  return Math.max(a * b * c, x * y * z);
}