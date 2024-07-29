main();

function main() {
  expect("leetcode", ["leet", "code"], true);
  expect("catsandog", ["cat", "cats", "and", "sand", "dog"], false);
  expect("aaaaaaaa", ["aa", "aaa"], true);
}

function expect(s, dict, expected) {
  const actual = wordBreak(s, dict);
  if (actual != expected) {
    console.error(`Expected wordBreak([${s}], [${dict}]) == ${expected}, got ${actual}`);
  }
}

function wordBreak(s, dict) {
  return wordBreakHelper(s, new Set(dict));
}

function wordBreakHelper(s, dict) {
  let head = "";
  for (let i = 0; i < s.length; i++) {
    head += s[i];
    if (dict.has(head)) {
      const tail = s.substring(i+1);
      if (tail == "") return true;
      if (wordBreakHelper(tail, dict)) return true;
    }
  }
  return false;
}