package main

import (
	"fmt"
)

func main() {
	expect("leetcode", []string{"leet", "code"}, true)
	expect("catsandog", []string{"cat", "cats", "and", "sand", "dog"}, false)
	expect("aaaaaaaa", []string{"aa", "aaa"}, true)
}

func expect(s string, dict []string, expected bool) {
	actual := wordBreak(s, dict)
	if actual != expected {
		fmt.Printf("Expected wordBreak(%v, %v) == %v, got %v\n", s, dict, expected, actual)
	}
}

func wordBreak(s string, dict []string) bool {
	dictMap := make(map[string]bool)
	for _, word := range dict {
		dictMap[word] = true
	}
	return wordBreakHelper(s, dictMap)
}

func wordBreakHelper(s string, dict map[string]bool) bool {
	var head, tail string
	for i := range s {
		head = s[:i+1]
		if _, ok := dict[head]; ok {
			tail = s[i+1:]
			if tail == "" {
				return true
			}
			if wordBreakHelper(tail, dict) {
				return true
			}
		}
	}
	return false
}
