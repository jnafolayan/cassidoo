console.log(equalLettersAndDigits("abc12345"));
console.log(equalLettersAndDigits("a123b4c"));
console.log(equalLettersAndDigits("a12bc34"));

function equalLettersAndDigits(s) {
    const equalSlices = [];

    for (let i = 0; i < s.length; i++) {
        const equal = equalLettersAndDigitsFn(s, i);
        const slices = equal.map((idx) => [i, idx, idx - i]);
        if (slices.length) {
            equalSlices.push(...slices);
        }
    }

    equalSlices.sort((a, b) => {
        const diff = b[2] - a[2];
        if (diff == 0) {
            return a[0] - b[0];
        }
        return diff;
    });

    if (!equalSlices.length) return "";

    const [[start, end, _]] = equalSlices;
    return s.substring(start, end + 1);
}

function equalLettersAndDigitsFn(s, offset) {
    const letters = new Set();
    const digits = new Set();
    const equalIndices = [];
    for (let i = offset; i < s.length; i++) {
        const c = s[i];
        if (isLetter(c)) {
            letters.add(c);
        } else if (isDigit(c)) {
            digits.add(c);
        }
        if (letters.size == digits.size) {
            equalIndices.push(i);
        }
    }
    return equalIndices;
}

function isDigit(c) {
    return Number.isInteger(+c);
}

function isLetter(c) {
    const code = c.charCodeAt(0);
    return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}
