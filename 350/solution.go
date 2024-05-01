package main

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"log"
	"strings"
)

const (
	layout        = "YDEyMzQ1Njc4OTAtPQpRV0VSVFlVSU9QW11cCkFTREZHSEpLTDsnCFpYQ1ZCTk0sLi8="
	shiftedLayout = "fiFAIyQlXiYqKClfKwpQe318Ckw6IgpNPD4/"
)

var globalLeftShiftMap map[byte]byte

func init() {
	globalLeftShiftMap = make(map[byte]byte)
	layouts := []string{layout, shiftedLayout}

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
	fmt.Println(translateRightShift("kpm nr;;opm od s hrmoid"))
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
		}
	}
	return leftShiftMap
}

// Merges b into a. Returns a.
func mergeMaps(a map[byte]byte, others ...map[byte]byte) map[byte]byte {
	for _, otherMap := range others {
		for k := range otherMap {
			a[k] = otherMap[k]
		}
	}
	return a
}
