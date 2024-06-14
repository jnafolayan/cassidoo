package main

import (
	"fmt"
	"slices"
)

func main() {
	expect([]int{1, 0, -1, 0, -2, 2}, 0, [][]int{{-2, -1, 1, 2}, {-2, 0, 0, 2}, {-1, 0, 0, 1}})
	expect([]int{}, 0, [][]int{})
	expect([]int{1, -2, -5, -4, -3, 3, 3, 5}, -11, [][]int{{-5, -4, -3, 1}})
}

func expect(ints []int, target int, expected [][]int) {
	actual := fourSum(ints, target)
	if len(actual) != len(expected) {
		fmt.Printf("Expected result of length %d, got %d\n", len(expected), len(actual))
		return
	}

	sequenceExists := func(seq []int) bool {
		_, ok := sliceFind(expected, []int{}, func(exp []int) bool {
			return isSliceSimilar(seq, exp)
		})
		return ok
	}

	if !sliceEvery(actual, sequenceExists) {
		fmt.Printf("Expected fourSum(%v, %d) \n==  %v, \ngot %v\n", ints, target, expected, actual)
	}
}

func fourSum(ints []int, target int) (result [][]int) {
	slices.Sort(ints)
	for i := 0; i < len(ints)-3; i++ {
		path := make([]int, 0, 4)
		path = append(path, i)
		fourSumHelper(ints, path, ints[i], target, &result)
	}

	seqIndicesToValues := func(seq []int) []int {
		return sliceMap(seq, func(i int) int {
			return ints[i]
		})
	}

	return sliceMap(result, seqIndicesToValues)
}

func fourSumHelper(ints []int, seq []int, curSum int, target int, result *[][]int) {
	if len(seq) == 4 {
		if curSum == target {
			*result = append(*result, seq)
		}
		return
	}

	i := 0
	if len(seq) > 0 {
		i = seq[len(seq)-1] + 1
	}

	for ; i < len(ints); i++ {
		newPath := make([]int, len(seq), 4)
		copy(newPath, seq)
		newPath = append(newPath, i)
		fourSumHelper(ints, newPath, curSum+ints[i], target, result)
	}

}

func isSliceSimilar[T comparable](a, b []T) bool {
	return len(a) == len(b) && sliceEvery(a, func(i T) bool {
		return slices.Contains(b, i)
	})
}

func sliceMap[T, U any](sl []T, f func(T) U) []U {
	res := make([]U, len(sl))
	for i := range sl {
		res[i] = f(sl[i])
	}
	return res
}

func sliceFind[T any](sl []T, defaultValue T, f func(T) bool) (T, bool) {
	for i := range sl {
		if f(sl[i]) {
			return sl[i], true
		}
	}
	return defaultValue, false
}

func sliceEvery[T any](sl []T, f func(T) bool) bool {
	for i := range sl {
		if !f(sl[i]) {
			return false
		}
	}
	return true
}
