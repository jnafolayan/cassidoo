console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
console.log(groupAnagrams(["vote", "please"]));
console.log(groupAnagrams(["debitcard", "badcredit"]));

/**
 * @param {string[]} strings
 */
function groupAnagrams(strings) {
    const anagrams = [];
    const open = strings.slice();
    let curAnagrams = [];

    while (open.length) {
        const str = open.shift();
        curAnagrams.push(str);

        for (let i = open.length - 1; i >= 0; i--) {
            if (isAnagram(str, open[i])) {
                curAnagrams.push(open.splice(i, 1)[0]);
            }
        }

        anagrams.push(curAnagrams);
        curAnagrams = [];
    }

    return anagrams;
}

/**
 * @param {string} strA
 * @param {string} strB
 */
function isAnagram(strA, strB) {
    if (strA.length !== strB.length) return false;
    const countA = countString(strA);
    const countB = countString(strB);
    return isCounterEqual(countA, countB);
}

/**
 * @param {string} str
 */
function countString(str) {
    const freq = new Map();
    for (const c of str) {
        freq.set(c, (freq.get(c) || 0) + 1);
    }
    return freq;
}

/**
 * @param {Map<string, number>} countA
 * @param {Map<string, number>} countB
 */
function isCounterEqual(countA, countB) {
    if (countA.size !== countB.size) return false;
    return [...countA.keys()].every(
        (key) => countA.get(key) === countB.get(key)
    );
}
