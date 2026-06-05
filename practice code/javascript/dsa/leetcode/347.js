const topKFrequent = function (nums, k) {
  const mp = {};
  for (const num of nums) {
    mp[num] = (mp[num] || 0) + 1;
  }
  const countMap = {};
  for (const [num, count] of Object.entries(mp)) {
    if (!countMap[count]) {
      countMap[count] = [];
    }
    countMap[count].push(Number(num));
  }
  const result = [];
  const arr = Object.values(countMap);
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(...arr[i]);
    if (result.length === k) {
      break;
    }
  }
  return result;
};
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));
