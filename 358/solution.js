main();

function main() {
  expect([70, 70, 70, 75], [3, 2, 1, 0]);
  expect([90, 80, 70, 60], [0, 0, 0, 0]);
  expect([73, 74, 75, 71, 69, 72, 76, 73], [1, 1, 4, 2, 1, 1, 0, 0]);
}

function expect(temps, expected) {
  const actual = dailyTemperatures(temps);
  const exactMatch = actual.every((_, i) => actual[i] == expected[i]);
  if (!exactMatch) {
    console.error(`Expected dailyTemperatures([${temps}]) == [${expected}], got [${actual}]`);
  }
}

function dailyTemperatures(temps) {
  const daysToWait = temps.map(() => 0);
  const seenDays = [];

  for (let i = 0; i < temps.length; i++) {
    // If we encounter a day temp greater than the last seen day temp, the days to
    // wait is the difference. Pop the last seen day temp from the `seen` stack
    // and repeat.
    while (seenDays.length > 0 && temps[i] > temps[seenDays[seenDays.length - 1]]) {
      const day = seenDays.pop();
      daysToWait[day] = i - day;
    }

    // Push day to stack after checking for the temp it is greater than.
    seenDays.push(i);
  }

  return daysToWait;
}