class Queue {
  #members = [];

  enqueue(val) {
    this.#members.push(val);
  }

  dequeue() {
    if (!this.size()) {
      return null;
    }
    return this.#members.shift(); // O(n) time complexity
  }

  peek() {
    return this.size() ? this.#members[0] : null;
  }

  size() {
    return this.#members.length;
  }

  isEmpty() {
    return !this.size();
  }

  clear() {
    this.#members = [];
  }

  toArray() {
    return this.#members;
  }
}

const q = new Queue();
q.enqueue(1);
q.enqueue(2);
console.log(q.dequeue()); // 1
console.log(q.peek()); // 2
console.log(q.isEmpty()); // false
console.log(q.size()); // 1
