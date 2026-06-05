class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class CircularSinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(data) {
    const newNode = new Node(data);

    if (!this.size) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }

    this.tail = newNode;
    newNode.next = this.head;
    this.size++;
  }

  prepend(data) {
    const newNode = new Node(data);

    if (!this.size) {
      this.tail = newNode;
      newNode.next = newNode;
    } else {
      newNode.next = this.head;
      this.tail.next = newNode;
    }

    this.head = newNode;
    this.size++;
  }
}
