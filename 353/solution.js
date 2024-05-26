const punctFixMap = {
  "?": "¿",
  "!": "¡"
};

main();

function main() {
  expect("Feliz cumpleaños!", "¡Feliz cumpleaños!");
  expect("Ella ya se graduó de la universidad? ¡No!", "¿Ella ya se graduó de la universidad? ¡No!");
}

function expect(testArg, toBe) {
  const result = fixInvertedPunc(testArg);
  if (result != toBe) {
    console.error(`Expected fixInvertedPunc("${testArg}") == "${toBe}"\ngot "${result}"`);
  }
}

function fixInvertedPunc(sentence) {
  // Find all punctuations in the sentence
  let puncts = [];
  for (let i = 0; i < sentence.length; i++) {
    if (!punctFixMap.hasOwnProperty(sentence[i])) {
      continue;
    }
    puncts.push({
      index: i, 
      punct: sentence[i],
      fix: punctFixMap[sentence[i]]
    });
  }

  puncts = puncts
    // Sort indices
    .sort((a, b) => a.index - b.index)
    // Set indexes to be relative to the sentences containing the punctuation.
    .map((p, idx, arr) => {
      if (idx > 0) {
        p.index -= arr[idx-1].index + 1
      }
      return p;
    });

  return _fixInvertedPuncHelper(sentence, puncts);
}

function _fixInvertedPuncHelper(sentence, puncts) {
  if (puncts.length == 0 || sentence.trim().length == 0) {
    return sentence;
  }

  const punct = puncts.shift();
  return _addPunctIfNeeded(punct, sentence) +
        _fixInvertedPuncHelper(sentence.substring(punct.index+1), puncts);
}

function _addPunctIfNeeded(punct, sentence) {
  const trimmed = sentence.trimStart();
  if (trimmed[0] == punct.fix) {
    return sentence;
  }

  const leadingSpace = sentence.length - trimmed.length;
  const fixed = punct.fix + trimmed.substring(0, punct.index + 1 + leadingSpace);

  return fixed.padStart(leadingSpace, " ");
}