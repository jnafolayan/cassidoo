package main

import "fmt"

func main() {
	fmt.Println(diceSum(1, 6, 3))
	fmt.Println(diceSum(2, 6, 7))
}

// n = die count
// m = face count per die
func diceSum(n, m, target int) int {
	return countFactors(n, m, target)
}

func countFactors(die, maxFactor, target int) int {
	var count, diff int
	die--
	for i := 1; i <= maxFactor; i++ {
		diff = target - i
		if diff == 0 && die == 0 {
			count++
		} else if die > 0 && diff > 0 {
			count += countFactors(die, maxFactor, diff)
		}
	}
	return count
}
