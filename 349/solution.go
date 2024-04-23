package main

import (
	"bytes"
	"fmt"
	"slices"
)

type grid [][]byte

func main() {
	printArrow("right", 3)
	printArrow("left", 5)
	printArrow("up", 2)

	// Additional tests
	printArrow("down", 4)
}

func printArrow(direction string, n int) {
	rows, cols := n*2-1, n
	g := makeGrid(rows, cols)
	for i := 0; i < cols; i++ {
		g[i][i] = '*'
		g[rows-i-1][i] = '*'
	}

	dirs := []string{"down", "left", "up"}
	g = rotate(g, slices.Index(dirs, direction)+1)

	fmt.Printf("%s\n", bytes.Join(g, []byte("\n")))
}

func rotate(g grid, count int) grid {
	var res grid
	rows, cols := len(g), len(g[0])
	if count == 0 {
		res = makeGrid(rows, cols)
		for i := range res {
			copy(res[i], g[i])
		}
		return res
	}

	res = makeGrid(cols, rows)
	for i := 0; i < rows; i++ {
		for j := 0; j < cols; j++ {
			res[j][rows-i-1] = g[i][j]
		}
	}

	if count > 1 {
		return rotate(res, count-1)
	}

	return res
}

func makeGrid(rows, cols int) grid {
	g := make(grid, rows)
	for i := 0; i < rows; i++ {
		g[i] = make([]byte, cols)
		for j := 0; j < cols; j++ {
			g[i][j] = ' '
		}
	}
	return g
}
