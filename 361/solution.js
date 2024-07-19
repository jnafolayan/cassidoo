main();

function main() {
  expect([10, 9, 2, 3, 7, 101, 18], 4);
  expect([4, 4, 4, 4, 3], 1);
}

function expect(nums, expected) {
  const actual = increasingSubsequence(nums);
  if (actual != expected) {
    console.error(`Expected increasingSubsequence([${nums}]) == ${expected}, got ${actual}`);
  }
}

function increasingSubsequence(nums) {
  let 
    bestLongest = 0,
    curLongest = 0;

  if (nums.length > 0) {
    curLongest = 1;
  }

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i-1]) {
      curLongest++;
    } else {
      bestLongest = Math.max(bestLongest, curLongest);
      curLongest = 1;
    }
  }

  return Math.max(curLongest, bestLongest);
}