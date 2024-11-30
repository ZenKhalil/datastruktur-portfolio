import {Tree, Node} from "./tree.js";

// Create a new tree
const tree = new Tree();

// Add some values to test
tree.addValue("A");
tree.addValue("B");
tree.addValue("C");

// Show the tree
console.log("Tree after adding A, B, C:");
tree.dump();

// Find value
const found = tree.findValue("B");
console.log("\nFound value B:", found ? "yes" : "no");

// Remove value
tree.removeValue("B");
console.log("\nTree after removing B:");
tree.dump();
