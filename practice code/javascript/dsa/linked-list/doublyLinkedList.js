class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  appendWithoutTail(data) {
    // if empty need to set head
    // else need to update next of last node
    const newNode = new Node(data);

    if (!this.size) {
      this.head = newNode;
    } else {
      let curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = newNode;
      newNode.prev = curr;
    }
    this.size++;
  }

  append(data) {
    const newNode = new Node(data);

    if (!this.size) {
      // if empty set head and tail
      this.head = newNode;
    } else {
      // else set tail. set next for last node and prev for new node
      this.tail.next = newNode;
      newNode.prev = this.tail;
    }
    this.tail = newNode;
    this.size++;
  }

  prepend(data) {
    const newNode = new Node(data);

    if (!this.size) {
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
    }

    this.head = newNode;
    this.size++;
  }

  insertAt(idx, data) {
    const newNode = new Node(data);

    if (idx > this.size) return;

    if (idx === 0) {
      newNode.next = this.head;
      if (this.head) {
        this.head.prev = newNode;
      }
      this.head = newNode;
    } else if (idx === this.size) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
    } else {
      const midIdx = Math.floor(this.size / 2);
      if (idx > midIdx) {
        // traverse from tail
        let curr = this.tail;
        for (let i = this.size - 1; i > idx; i--) {
          curr = curr.prev;
        }
        newNode.prev = curr.prev;
        newNode.next = curr;
        curr.prev.next = newNode;
        curr.prev = newNode;
      } else {
        // traverse from head
        let curr = this.head;
        for (let i = 0; i < idx - 1; i++) {
          curr = curr.next;
        }
        newNode.next = curr.next;
        newNode.prev = curr;
        curr.next = newNode;
        newNode.next.prev = newNode;
      }
    }

    if (idx === this.size) {
      this.tail = newNode;
    }
    this.size++;
  }

  reverse() {
    if (this.size <= 1) return;

    this.tail = this.head;

    let curr = this.head;
    for (let i = 0; i < this.size; i++) {
      const temp = curr.next;
      curr.next = curr.prev;
      curr.prev = temp;
      if (temp) {
        curr = temp;
      }
    }
    this.head = curr;
  }

  print() {
    const elements = [];
    let curr = this.head;
    for (let i = 0; i < this.size; i++) {
      elements.push(curr.data);
      curr = curr.next;
    }
    console.log(elements.join(" -> "));
  }
}

const list = new DoublyLinkedList();
list.append(2);
list.append(3);
list.append(6);
list.append(9);
list.append(12);
list.print();
list.prepend(55);
list.print();
list.insertAt(4, 123);
list.print();
list.reverse();
list.print();
