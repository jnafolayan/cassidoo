main();

function main() {
  expect( ["eceba"], 3 );
  expect( ["ccaabbb"], 5 );
  expect( ["abcabcabc"], 2 );

  // Added tests
  expect( ["eeeceee"], 7 );
}

function expect(testArgs, toBe) {
  const result = uniqueSubstr(...testArgs);
  if (result != toBe) {
    console.error(`Expected uniqueSubstr(${testArgs.join(", ")}) == ${toBe}, got ${result}`);
  }
}

/**
  * Returns the length of the longest substring in `str` containing 2 unique characters.
  * @params {string} str - the string to check
  * @returns {number}
  */
function uniqueSubstr(str) {
  let l = 0, r = 0;
  const charFreqs = {};
  let uniqCharsCount = 0;
  let bestDist = -1;

  // Do this as long as we have not gone out of bounds
  while ( l <= r && r < str.length ) {
    // This basically checks if we are encountering a character for the first time within the 
    // current search "window".
    if ( !(str[r] in charFreqs) || charFreqs[ str[r] ] == 0 ) {
      charFreqs[ str[r] ] = 0;
      uniqCharsCount++;
    }

    // Increment frequency of character at r
    charFreqs[ str[r] ]++; 

    // We only update `bestDist` if there are exactly two unique characters in the search window.
    if (uniqCharsCount == 2) {
      bestDist = Math.max( bestDist, r - l + 1 );
    } else if (uniqCharsCount >= 3) {
      // Shift the search window right if we have more than two unique characters. 
      // We also have to decrement the number of unique characters if necessary.
      if ( --charFreqs[ str[l] ] == 0 ) {
        uniqCharsCount--;
      }
      l++;
    }

    r++;
  }

  return bestDist; 
}
