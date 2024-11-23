console.log(maxTheStock([7, 1, 5, 3, 6, 4]));
console.log(maxTheStock([7, 6, 4, 3, 1]));

/**
 * @param {number[]} prices
 */
function maxTheStock(prices) {
    let bestProfit = -Number.MAX_SAFE_INTEGER;
    for (let i = prices.length - 1; i >= 0; i--) {
        const smallest = findSmallest(prices, i);
        bestProfit = Math.max(bestProfit, prices[i] - smallest);
    }
    return bestProfit;
}

/**
 * @param {number[]} prices
 * @param {number} end
 */
function findSmallest(prices, end) {
    let smallest = prices[0];
    for (let i = 1; i < end; i++) {
        smallest = Math.min(smallest, prices[i]);
    }
    return smallest;
}
