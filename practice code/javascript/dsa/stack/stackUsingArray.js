class Stack {
  #members = [];

  push(data) {
    this.#members.push(data);
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.#members.pop();
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.#members[this.#members.length - 1];
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
