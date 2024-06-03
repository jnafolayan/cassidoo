package main

import (
	"fmt"
	"slices"
)

func main() {
	expect([]int{1, 2, 3, 4, 5, 2}, []int{2, 2, 4})
	expect([]int{7, 8, 1, 0, 2, 5}, []int{0, 2, 8})
	expect([]int{11, 13, 15}, []int{})
}

func expect(arg, expected []int) {
	result := onlyEvens(arg)
	if !slices.Equal(result, expected) {
		fmt.Printf("expected onlyEvens(%v) == %v, got %v\n", arg, expected, result)
	}
}

func onlyEvens(integers []int) []int {
	var evens []int
	for _, v := range integers {
		if (v & 1) == 0 {
			evens = append(evens, v)
		}
	}

	slices.Sort(evens)
	return evens
}
