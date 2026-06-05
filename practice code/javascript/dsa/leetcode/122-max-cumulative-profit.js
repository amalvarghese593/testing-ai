// const maxProfit = function (prices, k = 2) {
//   let prevP = 0;
//   let l = 0,
//     r = 1;
//   const mp = {};
//   while (r < prices.length) {
//     const curr = prices[r];
//     const prev = prices[l];
//     const profit = curr - prev;
//     if (profit >= prevP) {
//       prevP = profit;
//     } else {
//       mp[prevP] = (mp[prevP] || 0) + 1;
//       prevP = 0;
//       l = r;
//     }

//     r++;
//   }
//   if (prevP) {
//     mp[prevP] = (mp[prevP] || 0) + 1;
//   }

//   const arr = Object.entries(mp);
//   let total = 0;
//   let maxP = 0;
//   for (let i = arr.length - 1; i >= 0; i--) {
//     const [profit, count] = arr[i];
//     total += count;

//     if (total >= k) {
//       maxP += profit * (count - (total - k));
//       break;
//     } else {
//       maxP += profit * count;
//     }
//   }

//   return maxP;
// };

// console.log(maxProfit([1, 2, 4, 2, 5, 7, 2, 4, 9, 0]));

for (i = 1; i <= 5; i++) {
  setTimeout(function () {
    console.log(i, globalThis.i);
  }, i * 1000);
}

console.log(`Hello world`);
