package main

import (
	"fmt"
	"strings"
)

func main() {
	fmt.Println(wrap("Hello, world! I am hungry.", 10))
}

func wrap(str string, length int) string {
	var lines []string
	var buffer strings.Builder
	cursor := 0

	for cursor < len(str) {
		ch := str[cursor]

		// Ensure a line does not start with a non-alphanum character
		if buffer.Len() == 0 && !isAlphanum(ch) {
			// FIXME: should non-alphanumeric characters be ignored?
			cursor++
			continue
		}

		if buffer.Len() == length-1 &&
			cursor+1 < len(str) &&
			ch != ' ' &&
			str[cursor+1] != ' ' {
			ch = '-'
			cursor--
		}

		buffer.WriteByte(ch)
		if buffer.Len() == length {
			lines = append(lines, buffer.String())
			buffer.Reset()
		}

		cursor++
	}

	if buffer.Len() != 0 {
		lines = append(lines, buffer.String())
	}

	return strings.Join(lines, "\n")
}

func isAlphanum(ch byte) bool {
	return (ch >= '0' && ch <= '9') ||
		(ch >= 'a' && ch <= 'z') ||
		(ch >= 'A' && ch <= 'Z')
}
