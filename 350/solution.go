package main

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"log"
	"maps"
	"strings"
)

const (
	layout          = "YDEyMzQ1Njc4OTAtPQpxd2VydHl1aW9wW11cCmFzZGZnaGprbDsnCnp4Y3Zibm0sLi8="
	upperCaseLayout = "UVdFUlRZVUlPUApBU0RGR0hKS0wKWlhDVkJOTQ=="
	shiftedLayout   = "fiFAIyQlXiYqKClfKwpwe318Cmw6IgptPD4/"
)

var globalLeftShiftMap map[byte]byte

func init() {
	globalLeftShiftMap = make(map[byte]byte)
	layouts := []string{layout, upperCaseLayout, shiftedLayout}

	// Generate the shift map for the supplied layouts
	for _, layout := range layouts {
		decodedLayout, err := base64.StdEncoding.DecodeString(layout)
		if err != nil {
			log.Fatalf("decoding error: %s", err)
		}

		leftShiftMap := createLeftShiftMap(decodedLayout)
		globalLeftShiftMap = mergeMaps(globalLeftShiftMap, leftShiftMap)
	}
}

func main() {
	fmt.Println(translateRightShift(";p; epeor"))
	fmt.Println(translateRightShift("ejp s, o"))
	// Easter egg ^_^
	fmt.Println(translateRightShift(`jyy[d"zzupiyi/nrzfWe5e0EhCvW`))
}

func translateRightShift(input string) string {
	return translateString(globalLeftShiftMap, input)
}

func translateString(leftShiftMap map[byte]byte, input string) string {
	var result strings.Builder
	for _, c := range input {
		if value, ok := leftShiftMap[byte(c)]; ok {
			result.WriteByte(value)
		} else {
			result.WriteRune(c)
		}
	}
	return result.String()
}

// Creates an object that maps a key to the key that precedes it (key to its left).
func createLeftShiftMap(layout []byte) map[byte]byte {
	leftShiftMap := make(map[byte]byte)
	lowercased := bytes.ToLower(layout)
	layoutRows := bytes.Split(lowercased, []byte("\n"))
	for _, layoutRow := range layoutRows {
		leftShiftMap = mergeMaps(leftShiftMap, createLeftShiftMapForLayoutRow(layoutRow))
	}
	return leftShiftMap
}

// Creates an object that maps a key to the key that precedes it (key to its left).
func createLeftShiftMapForLayoutRow(layoutRow []byte) map[byte]byte {
	leftShiftMap := make(map[byte]byte)
	for i, c := range layoutRow {
		if i > 0 {
			leftShiftMap[c] = layoutRow[i-1]
		} else {
			leftShiftMap[c] = layoutRow[len(layoutRow)-1]
		}
	}
	return leftShiftMap
}

// Merges multiple maps in reverse order. Returns a.
// Definitely a wasteful implementation! Passing an "accumulator" to each call
// would be better but hey!
func mergeMaps(a map[byte]byte, others ...map[byte]byte) map[byte]byte {
	if len(others) == 0 {
		return a
	}
	partial := mergeMaps(a, others[:len(others)-1]...)
	result := maps.Clone(others[len(others)-1])
	for k := range partial {
		result[k] = partial[k]
	}
	return result
}
