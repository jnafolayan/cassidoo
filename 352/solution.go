package main

import (
	"fmt"
	"math"
	"slices"
	"strings"
)

func main() {
	expect([]int{2, 4, 1, 3, -5, 6}, 72)
	// Extra tests
	expect([]int{3, 1, 8, 0, -3, -5}, 120)
	expect([]int{3, 1, 8, 0, -3, 6}, 144)
}

func expect(arg []int, expected int) {
	result := maxProduct(arg)
	if result != expected {
		var s = strings.ReplaceAll(fmt.Sprint(arg), " ", ", ")
		fmt.Printf("expected maxProduct(%s) == %d, got %d\n", s, expected, result)
	}
}

func maxProduct(list []int) int {
	slices.Sort(list)
	n := len(list)
	a, b, c := list[0], list[1], list[n-1]
	x, y, z := list[n-3], list[n-2], list[n-1]

	return int(math.Max(float64(a*b*c), float64(x*y*z)))
}
