// [9, 4, 2, 5, 7, 3, 1]
// {buyDay: 3, sellDay: 5, profit: 5}

const findMaxProfit = (arr) => {
  let l = 0,
    r = 1;
  let maxProfit = 0;
  let buyDay = 0;
  let sellDay = 0;

  while (r < arr.length) {
    const prev = arr[l];
    const curr = arr[r];
    if (curr < prev) {
      l = r;
    } else if (curr > prev) {
      const profit = curr - prev;
      if (profit > maxProfit) {
        sellDay = r + 1;
        maxProfit = profit;
        buyDay = l + 1;
      }
    }
    r++;
  }
  return { maxProfit, buyDay, sellDay };
};
console.log(findMaxProfit([7, 5, 1, 3, 6, 4, 0.5, 5, 2]));
