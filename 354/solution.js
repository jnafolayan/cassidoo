function main() {
  const t1 = new Task("7:04pm");
  const t2 = new Task("7:04pm");
  const executor = new DelayedTaskExecutor();
  executor.exec(t1);
  executor.exec(t2);
}

function parseTime(time) {
  const re = /^(\d{1,2}):(\d{1,2})\s*(am|pm)$/gi;
  const match = re.exec(time);
  if (!match) return null;

  const [_, h, m, period] = match;
  let hh = parseInt(h);
  let mm = parseInt(m);
  if (!isInRange(hh, 0, 12)) return null;
  if (!isInRange(mm, 0, 59)) return null;

  return [hh, mm, period.toLowerCase()];
}

function isInRange(n, min, max) {
  return n >= min && n <= max;
}

const NULL_TIMESTAMP = -1;

class Task {
  // The second in a 24-hour day when the task should be executed
  _timestamp;

  /**
   * @param {string} time time in the format hh:mm[am|pm]
   */
  constructor(time) {
    this.id = Math.random().toString(16).substring(2);

    const parsed = parseTime(time);
    if (!parsed) {
      this._timestamp = NULL_TIMESTAMP;
    } else {
      let [hh, mm, period] = parsed;
      if (period == "pm") hh += 12;

      this._timestamp = hh * 60 * 60 + mm * 60;
    }
  }

  run() {
    console.log(`running task ${this.id}`);
  }

  timeStamp() {
    return this._timestamp;
  }
}

class DelayedTaskExecutor {
  exec(task) {
    if (task.timeStamp() == NULL_TIMESTAMP) {
      console.log(`invalid timestamp for task ${task.id}`);
      return;
    }

    const d = new Date();
    const curTimeInSeconds = d.getHours() * 60 * 60 + d.getMinutes() * 60;
    const diff = task.timeStamp() - curTimeInSeconds;
    if (diff < 0) {
      console.log(`cannot execute task ${task.id} scheduled to run in the past`);
      return;
    }

    setTimeout(() => {
      try {
        task.run();
      } finally {
        console.log(`finished executing task ${task.id}`);
      }
    }, diff * 1000);
  }
}

main();
