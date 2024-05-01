// const layout = `\`1234567890-=\nQWERTYUIOP[]\\\nASDFGHJKL;'\bZXCVBNM,./`;
// const shiftedLayout = `~!@#$%^&*()_+\nP{}|\nL:"\nM<>?`;
const layout = "YDEyMzQ1Njc4OTAtPQpRV0VSVFlVSU9QW11cCkFTREZHSEpLTDsnCFpYQ1ZCTk0sLi8=";
const shiftedLayout = "fiFAIyQlXiYqKClfKwpQe318Ckw6IgpNPD4/";
const leftShiftMaps = [layout, shiftedLayout].map(atob).map(createLeftShiftMap);

main();

function main() {
  console.log(translateRightShift(";p; epeor"));
  console.log(translateRightShift("ejp s, o"));
  console.log(translateRightShift("kpm nr;;opm od s hrmoid"));
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
    toLowerCase().
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
      leftMap[char] = i > 0 ? layoutRow[i - 1] : undefined;
      return leftMap;
    }, {});
}

/**
 * Merges two objects in the reverse order. Values in a replace existing values in b.
 * @param {object} a 
 * @param {object} b 
 * @returns {object}
 */
function mergeObjects(a, b) {
  return { ...b, ...a };
}