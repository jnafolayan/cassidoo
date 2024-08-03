const metricUnits = ["m", "cm", "mm"];
const imperialUnits = ["ft", "in"];
const conversions = {};

// Add imperial -> metric conversions to avoid the FP precision loss if added
// in the reverse.
addConversion("ft", "m", 0.3048);
addConversion("ft", "cm", 30.48);
addConversion("ft", "mm", 304.8);
addConversion("in", "m", 0.0254);
addConversion("in", "cm", 2.54);
addConversion("in", "mm", 254);

main();

function main() {
  expect(7, "ft", "2m 13cm 3.6mm");
  expect(44, "cm", "1ft 5.32in");
}

function expect(value, unit, expected) {
  const actual = convertUnits(value, unit);
  if (actual != expected) {
    console.error(
      `Expected convertUnits(${value}, ${unit}) == ${expected}, got ${actual}`
    );
  }
}

function addConversion(fr, to, factor) {
  if (!conversions[fr]) {
    conversions[fr] = {};
  }
  if (!conversions[to]) {
    conversions[to] = {};
  }
  conversions[fr][to] = factor;
  conversions[to][fr] = 1 / factor;
}

function convertUnits(value, unit) {
  const isImperialUnit = imperialUnits.includes(unit);
  const range = isImperialUnit ? metricUnits : imperialUnits;

  const result = [];
  let remainder = value;

  for (const rangeUnit of range) {
    const rangeValue = remainder * conversions[unit][rangeUnit];
    const intRangeValue = Math.floor(rangeValue);
    // Remove the integer part
    remainder -= intRangeValue * conversions[rangeUnit][unit];
    // If this is the last unit to convert to, we want to display the entire range value
    const isLastRangeUnit = range[range.length - 1] == rangeUnit;
    const numberToDisplay = isLastRangeUnit ? rangeValue : intRangeValue;
    const formatted = formatNumber(numberToDisplay);
    result.push(`${formatted}${rangeUnit}`);
  }

  return result.join(" ");
}

function formatNumber(num, dp = 2) {
  let str = num.toFixed(dp);
  while (str.endsWith("0") || str.endsWith(".")) {
    str = str.substring(0, str.length - 1);
  }
  return str;
}
