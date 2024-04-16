package main

import "fmt"

func main() {
	fmt.Println(uniqueSubstr("eceba"))
	fmt.Println(uniqueSubstr("ccaabbb"))
	fmt.Println(uniqueSubstr("abcabcabc"))
}

func uniqueSubstr(str string) int {
	var l, r int
	var uniqueCharsCount int

	charFreqs := make(map[byte]int, len(str))
	bestDist := 0

	for _, c := range str {
		charFreqs[byte(c)] = 0
	}

	for l <= r && r < len(str) {
		if charFreqs[str[r]] == 0 {
			uniqueCharsCount++
		}
		charFreqs[str[r]]++

		if uniqueCharsCount == 2 {
			bestDist = max(bestDist, r-l+1)
		} else if uniqueCharsCount >= 3 {
			charFreqs[str[l]]--
			if charFreqs[str[l]] == 0 {
				uniqueCharsCount--
			}
			l++
		}

		r++
	}

	return bestDist
}
