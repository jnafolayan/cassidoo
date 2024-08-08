function main() {
    expect(5, 55);
    expect(10, 385);
    expect(25, 5525);
    expect(100, 338350);
}

function expect(n, expected) {
    const actual = squares(n);
    if (actual != expected) {
        console.error(`Expected squares(${n}) == ${expected}, got ${actual}`);
    }
}

const arrayLike = (n) => ({ length: n });
const indexPlusOne = (_, i) => i + 1;
const square = (x) => x ** 2;
const sum = (accum, x) => accum + x;
const squares = (n) =>
    Array.from(arrayLike(n))
        .map(indexPlusOne)
        .map(square)
        .reduce(sum, 0);

main();
