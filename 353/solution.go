package main

import (
	"fmt"
	"slices"
	"strings"
)

var punctFixMap map[string]string

func init() {
	punctFixMap = map[string]string{
		"?": "¿",
		"!": "¡",
	}
}

func main() {
	expect("Feliz cumpleaños!", "¡Feliz cumpleaños!")
	expect("Ella ya se graduó de la universidad? ¡No!", "¿Ella ya se graduó de la universidad? ¡No!")
}

func expect(arg string, expected string) {
	result := fixInvertedPunc(arg)
	if result != expected {
		fmt.Printf("expected fixInvertedPunc(%q) == %q, got %q\n", arg, expected, result)
	}
}

type punctIndex struct {
	idx   int
	punct string
	fix   string
}

func fixInvertedPunc(sentence string) string {
	// Find all punctuations in the sentence
	var puncts []*punctIndex
	for idx, c := range sentence {
		if _, ok := punctFixMap[string(c)]; !ok {
			continue
		}
		puncts = append(puncts, &punctIndex{
			idx:   idx,
			punct: string(c),
			fix:   punctFixMap[string(c)],
		})
	}

	// Sort indices
	slices.SortFunc(puncts, func(a, b *punctIndex) int {
		return a.idx - b.idx
	})

	// Set indexes to be relative to the sentences containing the punctuation.
	var prevP *punctIndex
	for _, p := range puncts {
		if prevP == nil {
			prevP = p
			continue
		}
		p.idx -= prevP.idx + 1
		prevP = p
	}

	return fixInvertedPuncHelper(sentence, puncts)
}

func fixInvertedPuncHelper(sentence string, puncts []*punctIndex) string {
	if len(sentence) == 0 || len(puncts) == 0 {
		return sentence
	}

	punct := puncts[0]
	return addPunctIfNeeded(punct, sentence) +
		fixInvertedPuncHelper(sentence[punct.idx+1:], puncts[1:])
}

func addPunctIfNeeded(punc *punctIndex, sentence string) string {
	trimmed := strings.TrimLeft(sentence, " ")
	if strings.HasPrefix(trimmed, punc.fix) {
		return sentence
	}

	leadingSpace := len(sentence) - len(trimmed)
	fixed := punc.fix + trimmed[:punc.idx+1+leadingSpace]

	return strings.Repeat(" ", leadingSpace) + fixed
}
