const obj = {
  count: 0,
  next() {
    return { value: this.count++, done: this.count >= 5 };
  },
};

// console.log(obj.next());
// console.log(obj.next());
// console.log(obj.next());
// console.log(obj.next());
// console.log(obj.next());
// console.log(obj.next());
// console.log(obj.next());

const iterableObj = {
  [Symbol.iterator]() {
    return {
      count: 0,
      next() {
        return { value: this.count++, done: this.count >= 6 };
      },
    };
  },
};

// for (const item of iterableObj) {
//   console.log(item);
// }

const gen = function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
};

for (let item of gen()) {
  console.log(item);
}
