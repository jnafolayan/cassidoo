main();

function main() {
  expect([1, 0, -1, 0, -2, 2], 0, [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]);
  expect([], 0, []);
  expect([1, -2, -5, -4, -3, 3, 3, 5], -11, [[-5, -4, -3, 1]]);
}

function expect(ints, target, expected) {
  const actual = fourSum(ints, target);
  if (actual.length != expected.length) {
    console.error(`Expected result of length ${expected.length}, got ${actual.length}`);
    return;
  }

  const sequenceExists = (seq) => expected.find(exp => isArraySimilar(seq, exp)) != null;
  if (!actual.every(sequenceExists)) {
    const tb = expected.map(a=>`[${a}]`);
    const r = actual.map(a=>`[${a}]`);
    console.error(`Expected fourSum([${ints}], ${target}) \n==  [${tb}], \ngot [${r}]`);
  }
}

function isArraySimilar(a, b) {
  return a.length == b.length && a.every((ele) => b.includes(ele));
}

function fourSum(ints, target) {
  const sortedInts = ints.toSorted((a, b) => a - b);
  const result = [];

  for (let i = 0; i < sortedInts.length - 3; i++) {
    fourSumHelper(sortedInts, [i], sortedInts[i], target, result);
  }

  const seqIndicesToValues = seq => seq.map(i => sortedInts[i]);
  const mapped = result.map(seqIndicesToValues);
  return mapped;
}

function fourSumHelper(ints, seq, curSum, target, result) {
  if (seq.length == 4) {
    (curSum == target) && result.push(seq);
    return;
  }

  let i = seq.length > 0 ? seq[seq.length - 1] + 1 : 0;
  for (; i < ints.length; i++) {
    fourSumHelper(ints, [...seq, i], curSum + ints[i], target, result);
  }
}