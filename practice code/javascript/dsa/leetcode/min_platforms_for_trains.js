const minPlatform = (arr, dep) => {
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    let curr = 1;
    for (let j = 0; j < arr.length; j++) {
      if (j !== i && arr[j] <= arr[i] && dep[j] >= arr[i]) {
        curr++;
      }
    }
    max = Math.max(max, curr);
  }
  return max;
};

const minPlatform2 = (arr, dep) => {
  arr.sort((a, b) => a - b);
  dep.sort((a, b) => a - b);

  let total = 0;
  let curr = 0;
  let i = 0,
    j = 0;
  while (i < arr.length && j < dep.length) {
    if (arr[i] <= dep[j]) {
      curr++;
      i++;
      total = Math.max(total, curr);
    } else {
      curr--;
      j++;
    }
  }
  return total;
};

const a = [646, 1812, 1953, 1859, 46, 1935, 1624, 617, 1645, 628];
const b = [805, 2200, 2106, 2333, 1554, 2047, 2020, 1900, 2048, 2351];
console.log(minPlatform(a, b));
console.log(minPlatform2(a, b));
