package main

import (
	"fmt"
)

func main() {
	expect([]int{10, 9, 2, 3, 7, 101, 18}, 4)
	expect([]int{4, 4, 4, 4, 3}, 1)
}

func expect(nums []int, expected int) {
	actual := increasingSubsequence(nums)
	if actual != expected {
		fmt.Printf("Expected increasingSubsequence(%v) == %v, got %v\n", nums, expected, actual)
	}
}

func increasingSubsequence(nums []int) int {
	var i, bestLongest, longest int

	if len(nums) > 0 {
		longest = 1
	}

	for i = 1; i < len(nums); i++ {
		if nums[i] > nums[i-1] {
			longest++
		} else {
			bestLongest = max(bestLongest, longest)
			longest = 1
		}
	}

	return max(longest, bestLongest)
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}
