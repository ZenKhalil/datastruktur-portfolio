import BinarySearchTree from "./binarysearchtree.js";

class AVLTree extends BinarySearchTree {
  // Beregner hvor skævt et træ er. Positiv = tungere til højre mens negativ = tungere til venstre
  skew(node) {
    if (!node) return 0;
    const leftHeight = node.left ? node.left.height : 0;
    const rightHeight = node.right ? node.right.height : 0;
    return rightHeight - leftHeight;
  }

  // Roterer en node til højre for at balancere træet
  rotateRight(node) {
    const newRoot = node.left;
    const parent = node.parent;

    // Flyt children rundt
    node.left = newRoot.right;
    if (node.left) node.left.parent = node;

    newRoot.right = node;
    node.parent = newRoot;

    // Tilslut til resten af træet
    newRoot.parent = parent;
    this.replaceChild(parent, node, newRoot);

    // Opdater højder på de ændrede nodes
    this.updateHeight(node);
    this.updateHeight(newRoot);

    return newRoot;
  }

  // Roterer en node til venstre for at balancere træet
  rotateLeft(node) {
    const newRoot = node.right;
    const parent = node.parent;

    // Flyt children rundt
    node.right = newRoot.left;
    if (node.right) node.right.parent = node;

    newRoot.left = node;
    node.parent = newRoot;

    // Tilslut til resten af træet
    newRoot.parent = parent;
    this.replaceChild(parent, node, newRoot);

    // Opdater højder på de ændrede nodes
    this.updateHeight(node);
    this.updateHeight(newRoot);

    return newRoot;
  }

  // Tjekker om en node er skæv og laver nogle nødvendige rotationer
  rebalance(node) {
    if (!node) return null;

    const skewValue = this.skew(node);

    // Hvis for tung går den til højre
    if (skewValue > 1) {
      if (this.skew(node.right) < 0) {
        // Dobbelt rotation nødvendig
        node.right = this.rotateRight(node.right);
      }
      return this.rotateLeft(node);
    }
    // Hvis for tung går den til venstre
    else if (skewValue < -1) {
      if (this.skew(node.left) > 0) {
        // Dobbelt rotation nødvendig
        node.left = this.rotateLeft(node.left);
      }
      return this.rotateRight(node);
    }

    return node;
  }

  maintain(node) {
    while (node) {
      this.updateHeight(node);
      node = this.rebalance(node);
      node = node.parent;
    }
  }
}

export default AVLTree;
