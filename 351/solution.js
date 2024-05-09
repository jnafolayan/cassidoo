main();

function main() {
  test('Hello, wo-rld! I am hungry.', 10, `Hello, wo-
rld! I am 
hungry.`);
}

function test(string, length, expected) {
  const actual = wrap(string, length);
  if (actual != expected) {
    console.error(`${string}:: expected \n${expected}, \ngot \n${actual}`);
  }
}

function wrap(string, length) {
  const result = [];
  let cursor = 0;
  let buffer = new Array(length);
  let bufferIndex = 0;
  let ch;

  while (cursor < string.length) {
    ch = string[cursor];

    // Ensure a line does not start with a non-alphanum character.
    if (bufferIndex == 0 && !isAlphaNum(ch)) {
      // FIXME: should non-alphanumeric characters be ignored?
      cursor++;
      continue;
    }
    
    buffer[bufferIndex] = ch;
    bufferIndex++;

    if (bufferIndex == length) {
      if (cursor + 1 < string.length 
        && ch != ' ' 
        && string[cursor+1] != ' '
      ) {
        // Replace the last character with a hyphen and decrement cursor.
        buffer[bufferIndex-1] = '-';
        cursor--;
      }

      result.push(buffer.join(''));

      // Clear the buffer
      buffer = new Array(length);
      bufferIndex = 0;
    }

    cursor++;
  }

  // Push any remaining string in the buffer
  if (bufferIndex != 0) {
    result.push(buffer.join(''));
  }
  
  return result.join('\n');
}

function isAlphaNum(char) {
  return /[a-zA-Z0-9]/.test(char);
}