class BinarySearchTree extends Tree {
  // Laver et nyt træ. Hvis ingen comparator gives bruges < og >
  constructor(comparator = (a, b) => (a < b ? -1 : a > b ? 1 : 0)) {
    super();
    this.comparator = comparator;
    this._size = 0;
  }

  // Laver en ny node med det givet item og parent
  createChild(parent, item) {
    const node = {
      item: item,
      parent: parent,
      left: null,
      right: null,
      height: 1,
    };
    this._size++;
    return node;
  }

  // Erstatter et barn i træet med et nyt, og så sørger for at alle forbindelser opdateres
  replaceChild(parent, oldChild, newChild) {
    if (!parent) {
      this.root = newChild;
      if (newChild) newChild.parent = null;
      return;
    }

    if (parent.left === oldChild) {
      parent.left = newChild;
    } else if (parent.right === oldChild) {
      parent.right = newChild;
    }

    if (newChild) {
      newChild.parent = parent;
    }
  }

  // Opdaterer højden af en node baseret på dens børns højder
  updateHeight(node) {
    const leftHeight = node.left ? node.left.height : 0;
    const rightHeight = node.right ? node.right.height : 0;
    node.height = Math.max(leftHeight, rightHeight) + 1;
  }

  maintain(node) {
    while (node) {
      this.updateHeight(node);
      node = node.parent;
    }
  }

  // Tilføjer et nyt element til træet på det rigtige sted
  add(item) {
    if (!this.root) {
      this.root = this.createChild(null, item);
      return;
    }

    let current = this.root;
    while (true) {
      // Sammenlign med nuværende node
      const comparison = this.comparator(item, current.item);

      if (comparison === 0) {
        return; // Item findes allerede
      }

      // Gå til venstre hvis mindre
      if (comparison < 0) {
        if (!current.left) {
          current.left = this.createChild(current, item);
          this.maintain(current.left);
          return;
        }
        current = current.left;
      } else {
        // Gå til højre hvis større
        if (!current.right) {
          current.right = this.createChild(current, item);
          this.maintain(current.right);
          return;
        }
        current = current.right;
      }
    }
  }

  // Tjekker om et element findes i træet
  contains(item) {
    let current = this.root;
    while (current) {
      const comparison = this.comparator(item, current.item);
      if (comparison === 0) return true;
      current = comparison < 0 ? current.left : current.right;
    }
    return false;
  }

  // Finder det mindste element i træet
  first() {
    if (!this.root) return null;
    let current = this.root;
    while (current.left) {
      current = current.left;
    }
    return current.item;
  }

  // Finder det største element i træet
  last() {
    if (!this.root) return null;
    let current = this.root;
    while (current.right) {
      current = current.right;
    }
    return current.item;
  }

  // Gennemløber træet i sorteret rækkefølge
  traverse() {
    const result = [];
    function inorder(node) {
      if (!node) return;
      inorder(node.left);
      result.push(node.item);
      inorder(node.right);
    }
    inorder(this.root);
    return result;
  }

  // Returnerer antal elementer i træet
  size() {
    return this._size;
  }

  // Printer træet som en pæn struktur
  print() {
    if (!this.root) {
      console.log("Tomt træ");
      return;
    }

    const levels = [];
    const queue = [{ node: this.root, level: 0 }];

    while (queue.length > 0) {
      const { node, level } = queue.shift();

      if (!levels[level]) {
        levels[level] = [];
      }

      if (node) {
        levels[level].push(node.item.toString());
        queue.push({ node: node.left, level: level + 1 });
        queue.push({ node: node.right, level: level + 1 });
      } else {
        levels[level].push(" ");
      }
    }

    levels.forEach((level, i) => {
      const spacing = " ".repeat(Math.pow(2, levels.length - i) - 1);
      console.log(spacing + level.join(spacing));
    });
  }
}

export default BinarySearchTree;
