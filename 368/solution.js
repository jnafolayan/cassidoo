// // Tests
// console.log(maxPairs(["L-10", "R-10", "L-11", "R-10", "L-10", "R-11"]));
// console.log(maxPairs(["L-10", "L-11", "L-12", "L-13"]));
// console.log(maxPairs(["L-8", "L-8", "L-8", "R-8"]));

function maxPairs(shoes) {
    const seenShoes = {};
    let pairCount = 0;

    for (const shoe of shoes) {
        const [leg, size] = shoe.split("-");
        const oppositeLeg = leg === "L" ? "R" : "L";
        const matchingShoe = `${oppositeLeg}-${size}`;

        if (getCounterValue(seenShoes, matchingShoe) > 0) {
            pairCount++;
            decrementCounterValue(seenShoes, matchingShoe);
        } else {
            setOrIncrementCounterValue(seenShoes, shoe);
        }
    }

    return pairCount;
}

function getCounterValue(dict, key) {
    return dict[key] || 0;
}

function decrementCounterValue(dict, key) {
    dict[key] = getCounterValue(dict, key) - 1;
}

function setOrIncrementCounterValue(dict, key) {
    dict[key] = getCounterValue(dict, key) + 1;
}
