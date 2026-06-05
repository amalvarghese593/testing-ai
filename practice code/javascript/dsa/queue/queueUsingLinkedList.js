class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(data) {
    const newNode = new Node(data);

    if (this.size) {
      this.tail.next = newNode;
    } else {
      this.head = newNode;
    }

    this.tail = newNode;
    this.size++;
  }

  prepend(data) {
    const newNode = new Node(data);

    if (!this.size) {
      this.tail = newNode;
    } else {
      newNode.next = this.head;
    }
    this.head = newNode;
    this.size++;
  }

  deleteFirst() {
    if (!this.size) return null;
    this.size--;
    const temp = this.head;
    this.head = this.head.next;
    return temp;
  }

  showFirst() {
    return this.head;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  toArray() {
    const elements = [];
    let curr = this.head;
    while (curr) {
      elements.push(curr.data);
      curr = curr.next;
    }
    return elements;
  }
}

class Queue {
  #members = new SinglyLinkedList();

  enqueue(val) {
    this.#members.append(val);
  }

  dequeue() {
    return this.#members.deleteFirst(); // O(1) time complexity
  }

  peek() {
    return this.#members.showFirst();
  }

  size() {
    return this.#members.size;
  }

  isEmpty() {
    return !this.size();
  }

  clear() {
    this.#members.clear();
  }

  toArray() {
    return this.#members.toArray();
  }
}

const q = new Queue();
q.enqueue(1);
q.enqueue(2);
console.log(q.dequeue()); // 1
console.log(q.peek()); // 2
console.log(q.isEmpty()); // false
console.log(q.size()); // 1
