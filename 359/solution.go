package main

import "fmt"

func main() {
	// Create a new fruit stand
	stand := NewFruitStand()

	// Add fruits to the stand
	stand.AddFruit("apple", 10, 0.5)
	stand.AddFruit("banana", 5, 0.2)
	stand.AddFruit("cherry", 20, 0.1)

	// Update the quantity of an existing fruit
	stand.UpdateQuantity("banana", 10)

	// Calculate the total value of all fruits in the stand
	total := stand.TotalValue()
	if total != 9.0 {
		fmt.Printf("Total value was incorrect, got: %f, want: 9", total)
	}
}

type Fruit struct {
	Name     string
	Quantity int
	Price    float32
}

type FruitStand struct {
	fruits map[string]*Fruit
}

func NewFruitStand() *FruitStand {
	return &FruitStand{
		fruits: make(map[string]*Fruit),
	}
}

func (fs *FruitStand) AddFruit(name string, quantity int, price float32) {
	fs.fruits[name] = &Fruit{
		Name:     name,
		Quantity: quantity,
		Price:    price,
	}
}

func (fs *FruitStand) UpdateQuantity(name string, quantity int) {
	if fruit, ok := fs.fruits[name]; ok {
		fruit.Quantity = quantity
	}
}

func (fs *FruitStand) TotalValue() float32 {
	var total float32 = 0
	for _, fruit := range fs.fruits {
		total += float32(fruit.Quantity) * fruit.Price
	}
	return total
}
