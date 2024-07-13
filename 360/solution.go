package main

import (
	"fmt"
	"slices"
)

func main() {
	expect([]int{1, 0, 0, 0, 1}, 1, true)
	expect([]int{1, 0, 0, 0, 1}, 2, false)
	expect([]int{0, 0, 0, 0, 0}, 3, true)
	expect([]int{1, 0, 1, 0, 1}, 1, false)

	// Extra cases
	expect([]int{0, 0, 0}, 2, true)
	expect([]int{0}, 1, true)
	expect([]int{0}, 3, false)
}

func expect(field []int, k int, expected bool) {
	actual := canPlantFlowers(field, k)
	if actual != expected {
		fmt.Printf("Expected canPlantFlowers(%v) == %v, got %v\n", field, expected, actual)
	}
}

const SOIL = 0
const PLANT = 1

func canPlantFlowers(field []int, k int) bool {
	// Clone the slice
	field = slices.Clone(field)
	for i, plantOrSoil := range field {
		if plantOrSoil == PLANT {
			continue
		}
		if (i == 0 || field[i-1] == SOIL) && (i+1 == len(field) || field[i+1] == SOIL) {
			field[i] = PLANT
			// Update the number of flowers to plant
			k--
		}
	}

	return k == 0
}
