// const layout = `\`1234567890-=\nqwertyuiop[]\\\nasdfghjkl;'\nzxcvbnm,./`;
// const upperCaseLayout = `QWERTYUIOP\nASDFGHJKL\nZXCVBNM`;
// const shiftedLayout = `~!@#$%^&*()_+\np{}|\nl:"\nm<>?`;
const layout = "YDEyMzQ1Njc4OTAtPQpxd2VydHl1aW9wW11cCmFzZGZnaGprbDsnCnp4Y3Zibm0sLi8=";
const upperCaseLayout = "UVdFUlRZVUlPUApBU0RGR0hKS0wKWlhDVkJOTQ==";
const shiftedLayout = "fiFAIyQlXiYqKClfKwpwe318Cmw6IgptPD4/";
const leftShiftMaps = [layout, upperCaseLayout, shiftedLayout].map(atob).map(createLeftShiftMap);

main();

function main() {
  console.log(translateRightShift(";p; epeor"));
  console.log(translateRightShift("ejp s, o"));
  // Easter egg ^_^
  console.log(translateRightShift(`jyy[d"zzupiyi/nrzfWe5e0EhCvW`));
}

function translateRightShift(input) {
  return translateString(mergeObjects(...leftShiftMaps), input);
}

function translateString(leftShiftMap, input) {
  return Object.
    values(input).
    map(char => leftShiftMap[char] ?? char).
    join("");
}

/**
 * Creates an object that maps a key to the key that precedes it (key to its left).
 * @param {string} layout - a string of keys representing keyboard layout.
 * @returns {Record<string, string | undefined>}
 */
function createLeftShiftMap(layout) {
  return layout.
    split('\n').
    reduce((leftMap, layoutRow) => {
      return mergeObjects(leftMap, createLeftShiftMapForLayoutRow(layoutRow))
    }, {});
}

/**
 * Creates an object that maps a key to the key that precedes it (key to its left).
 * @param {string} layoutRow - a string of keys
 * @returns {Record<string, string | undefined>}
 */
function createLeftShiftMapForLayoutRow(layoutRow) {
  return Object.
    values(layoutRow).
    reduce((leftMap, char, i) => {
      leftMap[char] = i > 0 ? layoutRow[i - 1] : layoutRow[layoutRow.length - 1];
      return leftMap;
    }, {});
}

/**
 * Merges two objects in reverse order. Values in a replace values from b.
 * @param {object} a 
 * @param {object} b 
 * @returns {object}
 */
function mergeObjects(a, ...args) {
  if (args.length == 0) return a;
  return { ...args[args.length - 1], ...mergeObjects(a, ...args.slice(0, -1)) };
}