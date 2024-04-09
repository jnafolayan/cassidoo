main();

function main() {
	expect([1, 6, 3], 1);
	expect([2, 6, 7], 6);

  // Other tests
  expect([2, 6, 1], 0);
  expect([2, 6, 5], 4);
  expect([2, 6, 2], 1);
  expect([3, 6, 5], 6);
}

function expect(testArgs, toBe) {
  const result = diceSum(...testArgs);
  if (result != toBe) {
    console.error(`Expected diceSum(${testArgs.join(", ")}) == ${toBe}, got ${result}`);
  }
}

/**
 * Counts the number of ways a target number can be gotten by 
 * adding the faces of `n` dice. 
 * @param {number} n die count
 * @param {number} m face count per die
 */
function diceSum(n, m, target) {
	return countFactors(n, m, target);
}

/**
 * Internal alias for `diceSum()` mostly to give the parameters
 * readable names.
 * @param {number} die number of dice left
 * @param {number} maxFactor max factor aka number of faces
 * @param {number} target number to generate factors for
 * @returns {number}
 */
function countFactors(die, maxFactor, target) {
	let count = 0, 
    diff = 0;

  die--;
    
	for (let i = 1; i <= maxFactor; i++) {
		diff = target - i;
		if (diff == 0 && die == 0) 
      count++;
		else if (die > 0 && diff > 0)
			count += countFactors(die, maxFactor, diff);
	}

	return count;
}
