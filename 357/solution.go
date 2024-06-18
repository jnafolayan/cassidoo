package main

import (
	"cmp"
	"fmt"
	"regexp"
	"slices"
)

var vowelRegexp = regexp.MustCompile(`(?i)[aeiou]`)

func main() {
	expect([]string{"Goku", "Vegeta", "Piccolo", "Gohan"}, []string{"Piccolo", "Vegeta", "Gohan", "Goku"})

	// FIXME: Expected array should have the positions of "Winry" and "Roy" swapped.
	expect([]string{"Edward", "Alphonse", "Roy", "Winry"}, []string{"Alphonse", "Edward", "Winry", "Roy"})
}

func expect(names, expected []string) {
	actual := sortNames(names)

	exactMatch := sliceEvery(actual, func(_ string, i int) bool {
		return actual[i] == expected[i]
	})

	if !exactMatch {
		fmt.Printf("Expected sortNames(%v) == %v, got %v\n", names, expected, actual)
	}
}

func sortNames(names []string) []string {
	clonedNames := slices.Clone(names)
	slices.SortFunc(clonedNames, func(nameA, nameB string) int {
		if d := countVowels(nameB) - countVowels(nameA); d != 0 {
			return d
		}
		return cmp.Compare(nameA, nameB)
	})
	return clonedNames
}

func countVowels(name string) int {
	return len(vowelRegexp.FindAllString(name, len(name)))
}

func sliceEvery[T any](sl []T, f func(T, int) bool) bool {
	for i := range sl {
		if !f(sl[i], i) {
			return false
		}
	}
	return true
}
