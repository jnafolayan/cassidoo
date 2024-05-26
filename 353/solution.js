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
  const puncts = Object.keys(punctFixMap)
    .map(p => ({
      index: sentence.indexOf(p), 
      punct: p,
      fix: punctFixMap[p]
    }))
    .filter(punct => punct.index != -1)
    .sort((a, b) => a.index - b.index);

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

  const fixed = punct.fix + trimmed.substring(0, punct.index + 1);
  const leadingSpace = sentence.length - trimmed.length;

  return fixed.padStart(leadingSpace, " ");
}