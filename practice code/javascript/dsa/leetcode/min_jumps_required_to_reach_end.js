function minJumps(arr) {
  if (arr.length <= 1) return 0;

  let jumps = 0;
  for (let i = 0; i < arr.length - 1; ) {
    if (arr[i] === 0) return -1;

    // Can we reach the end directly from i?
    if (i + arr[i] >= arr.length - 1) return jumps + 1;

    // Greedy: pick the next position that reaches the farthest
    let maxDist = 0,
      maxIdx = i + 1;
    for (let j = i + 1; j <= i + arr[i] && j < arr.length; j++) {
      const dist = j + arr[j];
      if (dist > maxDist) {
        maxDist = dist;
        maxIdx = j;
      }
    }
    jumps++;
    i = maxIdx;
  }
  return jumps;
}

console.log(minJumps([1, 3, 5, 8, 9, 2, 6, 7, 6, 8, 9]));
