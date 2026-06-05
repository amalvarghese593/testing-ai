class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null; // if we are simply appending new nodes we can use tail pointer to point to last node. This way append() would have a time complexity of O(1)
    this.size = 0;
  }

  prepend(data) {
    const newNode = new Node(data);
    newNode.next = this.head; // if empty list we assign null, so its ok. We can also add an if condition, ie if(this.head){}
    this.head = newNode;
    this.size++;
  }

  append(data) {
    // find last node. point its next to the new Node
    const newNode = new Node(data);
    if (!this.head) {
      // if empty list
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  insertAt(idx, data) {
    if (idx > this.size) return; // idx out of bound otherwise

    const newNode = new Node(data);

    if (idx === 0) {
      // we dont check empty list. We only check if insert idx is 0
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      for (let i = 0; i < idx - 1; i++) {
        current = current.next;
      }
      newNode.next = current.next;
      current.next = newNode;
    }

    this.size++;
  }

  delete(data) {
    let current = this.head;
    if (!current) return;

    if (current.data === data) {
      this.head = current.next; // if first element needs to be deleted we need to remove all references of this node object so that it can be garbage collected
      this.size--;
      return;
    }

    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        this.size--;
        return;
      }
      current = current.next;
    }
  }

  deleteAt(idx) {
    if (!this.size || idx >= this.size) return;

    this.size--;
    if (idx === 0) {
      // if we delete first node, update head
      this.head = this.head.next;
    } else {
      // for other nodes we need to update next of prev node
      let curr = this.head;
      // for (let i = 0; ; i++) {
      //   if (i === idx - 1) {
      //     curr.next = curr.next.next;
      //     break;
      //   }
      //   curr = curr.next;
      // }
      for (let i = 0; i < idx - 1; i++) {
        curr = curr.next;
      }
      curr.next = curr.next.next;
    }
  }

  search(data) {
    let current = this.head;

    while (current) {
      if (current.data === data) {
        return true;
      }
      current = current.next;
    }

    return false;
  }

  reverse() {
    if (this.size <= 1) return;

    let current = this.head;
    let prev = null;
    while (current) {
      const temp = current.next;
      current.next = prev;
      prev = current;
      current = temp;
    }
    this.head = prev;
  }

  print() {
    const elements = [];
    let current = this.head;

    while (current) {
      elements.push(current.data);
      current = current.next;
    }

    console.log(elements.join(" -> "));
  }
}

const list = new SinglyLinkedList();
list.append(3);
list.append(5);
list.append(10);
list.append(15);
list.print();
list.prepend(2);
list.print();
console.log(list.search(5));
list.delete(5);
console.log(list.search(5));
list.print();
list.insertAt(2, 77);
list.print();
list.reverse();
list.print();
list.deleteAt(3);
list.print();

/* 
 TODO
*/
//    deleteAt(index)
