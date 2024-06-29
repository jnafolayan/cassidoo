package main

import (
	"fmt"
)

func main() {
	expect([]int{70, 70, 70, 75}, []int{3, 2, 1, 0})
	expect([]int{90, 80, 70, 60}, []int{0, 0, 0, 0})
	expect([]int{73, 74, 75, 71, 69, 72, 76, 73}, []int{1, 1, 4, 2, 1, 1, 0, 0})
}

func expect(temps, expected []int) {
	actual := dailyTemperatures(temps)
	exactMatch := sliceEvery(actual, func(_, i int) bool {
		return actual[i] == expected[i]
	})
	if !exactMatch {
		fmt.Printf("Expected dailyTemperatures(%v) == %v, got %v\n", temps, expected, actual)
	}
}

func dailyTemperatures(temps []int) []int {
	daysToWait := make([]int, len(temps))
	seen := make([]int, 0, len(temps))

	var idx int
	for i := range temps {
		// If we encounter a day temp greater than the last seen day temp, the days to
		// wait is the difference. Pop the last seen day temp from the `seen` stack
		// and repeat.
		for len(seen) > 0 && temps[i] > temps[seen[len(seen)-1]] {
			idx = seen[len(seen)-1]
			daysToWait[idx] = i - idx
			seen = seen[:len(seen)-1]
		}

		// Push day to stack after checking for the temp it is greater than.
		seen = append(seen, i)
	}

	return daysToWait
}

func sliceEvery[T any](sl []T, f func(T, int) bool) bool {
	for i := range sl {
		if !f(sl[i], i) {
			return false
		}
	}
	return true
}
