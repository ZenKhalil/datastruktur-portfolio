export default class DoublyLinkedList {
  head = null;
  tail = null;

  // ******************** metoder til data ***********************
  
  // Tilføjer et element til slutningen af listen
  addLast(data) {
    const node = new Node(data);
    this.addNodeLast(node);
  }

  // Tilføjer et element til begyndelsen af listen
  addFirst(data) {
    const node = new Node(data);
    this.addNodeFirst(node);
  }

  // Returnerer elementet på plads nummer *index*
  get(index) {
    const node = this.nodeAt(index);
    return node ? node.data : null;
  }

  // Finder plads nummer for det angivne element (data)
  indexOf(data) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.data === data) return index;
      current = current.next;
      index++;
    }
    return -1;
  }

  // Indsætter et nyt element efter plads nummer *index*
  insertAfter(index, data) {
    const existingNode = this.nodeAt(index);
    if (!existingNode) return;
    const newNode = new Node(data);
    this.insertAfterNode(newNode, existingNode);
  }

  // Indsætter et nyt element før plads nummer *index*
  insertBefore(index, data) {
    const existingNode = this.nodeAt(index);
    if (!existingNode) return;
    const newNode = new Node(data);
    this.insertBeforeNode(newNode, existingNode);
  }

  // Returnerer det første element i listen
  first() {
    return this.head ? this.head.data : null;
  }

  // Returnerer det sidste element i listen
  last() {
    return this.tail ? this.tail.data : null;
  }

  // Fjerner et element fra listen, hvis det findes
  remove(data) {
    let current = this.head;
    while (current) {
      if (current.data === data) {
        this.removeNode(current);
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // Fjerner elementet på et givent *index*
  removeIndex(index) {
    const node = this.nodeAt(index);
    if (node) this.removeNode(node);
  }

  // Fjerner det første element og returnerer det
  removeFirst() {
    if (!this.head) return null;
    const oldHead = this.head;
    if (oldHead?.next) {
      this.head = oldHead.next;
      this.head.prev = null;
    } else {
      this.clear();
    }
    return oldHead;
  }

  // Fjerner det sidste element og returnerer det
  removeLast() {
    if (!this.tail) return null;
    const oldTail = this.tail;
    if (oldTail?.prev) {
      this.tail = oldTail.prev;
      this.tail.next = null;
    } else {
      this.clear();
    }
    return oldTail;
  }

  // ******************** metoder til nodes ***********************

  // Tilføjer en ny node til slutningen af listen
  addNodeLast(newNode) {
    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  // Tilføjer en ny node i starten af listen
  addNodeFirst(newNode) {
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  // Indsætter en ny node efter en eksisterende node
  insertAfterNode(newNode, existingNode) {
    if (existingNode === this.tail) {
      this.addNodeLast(newNode);
    } else {
      const oldNext = existingNode.next;
      newNode.prev = existingNode;
      newNode.next = oldNext;
      oldNext.prev = newNode;
      existingNode.next = newNode;
    }
  }

  // Indsætter en ny node før en eksisterende node
  insertBeforeNode(newNode, existingNode) {
    if (existingNode === this.head) {
      this.addNodeFirst(newNode);
    } else {
      const oldPrev = existingNode.prev;
      newNode.prev = oldPrev;
      newNode.next = existingNode;
      oldPrev.next = newNode;
      existingNode.prev = newNode;
    }
  }

  // Fjerner en eksisterende node
  removeNode(existingNode) {
    if (!existingNode) return console.error("Kan ikke fjerne node: node findes ikke");

    if (existingNode === this.head) {
      this.removeFirst();
    } else if (existingNode === this.tail) {
      this.removeLast();
    } else {
      const oldPrev = existingNode.prev;
      const oldNext = existingNode.next;
      if (oldPrev) oldPrev.next = oldNext;
      if (oldNext) oldNext.prev = oldPrev;
    }
  }

  // Returnerer noden på et givent *index*
  nodeAt(index) {
    let current = this.head;
    let i = 0;

    while (current && i < index) {
      current = current.next;
      i++;
    }
    return current;
  }

  // Bytter om på to nodes pladser i listen
  swapNodes(nodeA, nodeB) {
    if (nodeA === nodeB) return;
    const prevA = nodeA.prev;
    const nextA = nodeA.next;
    const prevB = nodeB.prev;
    const nextB = nodeB.next;

    if (nodeA.next === nodeB) {
      nodeA.next = nextB;
      nodeA.prev = nodeB;
      nodeB.next = nodeA;
      nodeB.prev = prevA;
      if (nextB) nextB.prev = nodeA;
      if (prevA) prevA.next = nodeB;
    } else if (nodeB.next === nodeA) {
      nodeB.next = nextA;
      nodeB.prev = nodeA;
      nodeA.next = nodeB;
      nodeA.prev = prevB;
      if (nextA) nextA.prev = nodeB;
      if (prevB) prevB.next = nodeA;
    } else {
      if (prevA) prevA.next = nodeB;
      if (nextA) nextA.prev = nodeB;
      if (prevB) prevB.next = nodeA;
      if (nextB) nextB.prev = nodeA;

      nodeA.next = nextB;
      nodeA.prev = prevB;
      nodeB.next = nextA;
      nodeB.prev = prevA;
    }

    if (this.head === nodeA) this.head = nodeB;
    else if (this.head === nodeB) this.head = nodeA;
    if (this.tail === nodeA) this.tail = nodeB;
    else if (this.tail === nodeB) this.tail = nodeA;
  }

  // ******************** metoder til hele listen ***********************
  
  // Fjerner alle elementer fra listen
  clear() {
    this.head = null;
    this.tail = null;
  }

  // Returnerer antallet af nodes i listen
  size() {
    let count = 0;
    let current = this.head;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }

  // Udskriver hele listen i console
  dumpList() {
    if (!this.head) {
      console.log("Listen er tom.");
      return;
    }

    console.log(`
      Linked List:
      ====================
      head: ${this.head.data}
      tail: ${this.tail.data}
    `);

    let current = this.head;
    while (current) {
      console.log(`
        Node: ${current.data}
        ---------------------
        prev: ${current.prev?.data}
        next: ${current.next?.data}
      `);
      current = current.next;
    }
  }
}

export class Node {
  data;
  next;
  prev;

  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}
