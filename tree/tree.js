class Node {
  constructor(value) {
    this.value = value;
    this.parent = null;
    this.childNodes = [];
  }

  firstChild() {
    return this.childNodes[0] || null;
  }

  lastChild() {
    return this.childNodes[this.childNodes.length - 1] || null;
  }

  hasChildNodes() {
    return this.childNodes.length > 0;
  }

  appendChild(child) {
    child.parent = this;
    this.childNodes.push(child);
  }

  removeChild(child) {
    const index = this.childNodes.indexOf(child);
    if (index !== -1) {
      this.childNodes.splice(index, 1);
      child.parent = null;
    }
  }

  replaceChild(newChild, oldChild) {
    const index = this.childNodes.indexOf(oldChild);
    if (index !== -1) {
      this.childNodes[index] = newChild;
      newChild.parent = this;
      oldChild.parent = null;
    }
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  dump() {
    this.printNode(this.root, 0);
  }

  printNode(node, level) {
    if (!node) {
      console.log("Empty tree");
      return;
    }

    console.log("  ".repeat(level) + node.value);
    for (let child of node.childNodes) {
      this.printNode(child, level + 1);
    }
  }

  addValue(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
    } else {
      this.root.appendChild(newNode);
    }
    return newNode;
  }

  findValue(value) {
    return this.searchNode(this.root, value);
  }

  searchNode(node, value) {
    if (!node) return null;
    if (node.value === value) return node;

    for (let child of node.childNodes) {
      const found = this.searchNode(child, value);
      if (found) return found;
    }
    return null;
  }

  removeValue(value) {
    const node = this.findValue(value);
    if (node === this.root) {
      this.root = null;
    } else if (node) {
      node.parent.removeChild(node);
    }
  }
}

module.exports = { Tree, Node };
