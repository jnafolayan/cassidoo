package main

import (
	"errors"
	"log"
	"regexp"
	"strconv"
	"sync"
	"time"
)

func main() {
	e := &DelayedTaskExecutor{}
	e.Exec(newTask("8:05pm"))
	e.Exec(newTask("8:05pm"))

	e.Wait()
}

const NULL_TIMESTAMP = -1

var uuidCounter int = 0

type Task struct {
	id        int
	timestamp int32 // The second in a 24-hour day when the task should be executed
}

func newTask(time string) Task {
	hh, mm, period, err := parseTime(time)
	var timestamp int32 = NULL_TIMESTAMP

	if err != nil {
		timestamp = NULL_TIMESTAMP
	} else {
		if period == "pm" {
			hh += 12
		}
		timestamp = int32(hh)*60*60 + int32(mm)*60
	}

	uuidCounter++
	return Task{id: uuidCounter, timestamp: int32(timestamp)}
}

func (t Task) GetID() int {
	return t.id
}

func (t Task) TimeStamp() int32 {
	return t.timestamp
}

func (t Task) Run() {
	// not implemented
	log.Printf("running %d", t.id)
}

type DelayedTaskExecutor struct {
	wg sync.WaitGroup
}

func (dte *DelayedTaskExecutor) Wait() {
	dte.wg.Wait()
}

func (dte *DelayedTaskExecutor) Exec(t Task) {
	if t.TimeStamp() == NULL_TIMESTAMP {
		log.Printf("invalid timestamp for task %d", t.GetID())
		return
	}

	d := time.Now()
	curTimeInSeconds := int32(d.Hour())*60*60 + int32(d.Minute())*60
	diff := t.TimeStamp() - curTimeInSeconds
	if diff < 0 {
		log.Printf("cannot execute task %d scheduled to run in the past", t.GetID())
		return
	}

	dte.wg.Add(1)

	go func() {
		time.Sleep(time.Duration(diff) * time.Second)
		t.Run()
		log.Printf("finished executing task %d", t.GetID())
		dte.wg.Done()
	}()
}

func parseTime(time string) (int, int, string, error) {
	matches := regexp.MustCompile(`^(\d{1,2}):(\d{1,2})\s*(am|pm)$`).FindAllStringSubmatch(time, -1)
	if len(matches) == 0 {
		return 0, 0, "", errors.New("invalid time format")
	}

	var hh, mm int
	var period string
	match := matches[0]

	h, _ := strconv.ParseInt(match[1], 10, 16)
	m, _ := strconv.ParseInt(match[2], 10, 16)
	period = match[3]

	hh = int(h)
	mm = int(m)

	if !isInRange(hh, 0, 12) {
		return 0, 0, "", errors.New("invalid hour")
	}
	if !isInRange(mm, 0, 59) {
		return 0, 0, "", errors.New("invalid minute")
	}

	return hh, mm, period, nil
}

func isInRange(n, a, b int) bool {
	return n >= a && n <= b
}
