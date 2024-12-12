function wrapGifts(gifts, strip) {
    const maxGiftsIndexes = wrapGiftsInternal(gifts, strip, new Set());
    const maxGifts = [...maxGiftsIndexes].map((gi) => gifts[gi]);
    console.log(
        "max gift for %s with paper size '%d': %s",
        gifts,
        strip,
        maxGifts
    );
    return maxGiftsIndexes.size;
}

/**
 * @param {number[]} gifts
 * @param {number} strip
 * @param {Set<number>} wrapped
 * @returns {Set<number>}
 */
function wrapGiftsInternal(gifts, strip, wrapped) {
    return gifts.reduce((best, gift, index) => {
        if (wrapped.has(index) || strip < gift) return best;

        const localWrapped = new Set(wrapped);
        localWrapped.add(index);

        const localBest = wrapGiftsInternal(gifts, strip - gift, localWrapped);
        return localBest.size > best.size ? localBest : best;
    }, wrapped);
}

// console.log(wrapGifts([2, 3, 4, 5], 7));
// console.log(wrapGifts([1, 1, 1, 1, 1, 1, 1], 3));
// console.log(wrapGifts([1, 2, 3, 4, 5], 6));
