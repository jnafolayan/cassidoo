main();

function main() {
  expect(["Goku", "Vegeta", "Piccolo", "Gohan"], ["Piccolo", "Vegeta", "Gohan", "Goku"]);

  // FIXME: Expected array should have the positions of "Winry" and "Roy" swapped.
  expect(["Edward", "Alphonse", "Roy", "Winry"], ["Alphonse", "Edward", "Winry", "Roy"]);
}

function expect(names, expected) {
  const actual = sortNames(names);
  const exactMatch = actual.every((_, i) => actual[i] == expected[i]);
  if (!exactMatch) {
    console.error(`Expected sortNames([${names}]) == [${expected}], got [${actual}]`);
  }
}

function sortNames(names) {
  const collator = new Intl.Collator("en");

  return names.toSorted((nameA, nameB) => {
    const vowelsInA = countVowels(nameA);
    const vowelsInB = countVowels(nameB);
    const diff = vowelsInB - vowelsInA;
    if (diff == 0) {
      return collator.compare(nameA, nameB);
    }
    return diff;
  });
}

function countVowels(name) {
  return name.match(/[aeiou]/gi)?.length ?? 0;
}