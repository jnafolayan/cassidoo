function main() {
  // Create a new fruit stand
  let stand = FruitStand();

  // Add fruits to the stand
  stand.addFruit("apple", 10, 0.5);
  stand.addFruit("banana", 5, 0.2);
  stand.addFruit("cherry", 20, 0.1);

  // Update the quantity of an existing fruit
  stand.updateQuantity("banana", 10);

  // Calculate the total value of all fruits in the stand
  const total = stand.totalValue();
  if (total != 9) {
    console.error(`Total value was incorrect, got: ${total}, want: 9`);
  }
}

function FruitStand() {
  if (!(this instanceof FruitStand)) return new FruitStand();
  this.fruits = {};
}

FruitStand.prototype = {
  // addFruit replaces any existing entry for a fruit
  addFruit(name, quantity, price) {
    this.fruits[name] = { name, quantity, price };
  },

  updateQuantity(name, quantity) {
    if (!(name in this.fruits)) return;
    this.fruits[name].quantity = quantity;
  },

  totalValue() {
    return Object.values(this.fruits)
      .map(({ quantity, price }) => quantity * price)
      .reduce((total, fruitValue) => total + fruitValue, 0);
  }
}

main();
