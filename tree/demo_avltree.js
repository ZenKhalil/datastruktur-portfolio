import AVLTree from "./avltree.js";

console.log("Test 1: Numerisk træ");
const numericTree = new AVLTree();
console.log("Tilføjer tallene: 50, 25, 75, 12, 37, 60, 90");
[50, 25, 75, 12, 37, 60, 90].forEach((n) => numericTree.add(n));

console.log("\nUdskriver træet:");
numericTree.print();

console.log("\nTest af basis operationer:");
console.log("Første element:", numericTree.first()); // 12
console.log("Sidste element:", numericTree.last()); // 90
console.log("Indeholder 37:", numericTree.contains(37)); // true
console.log("Indeholder 42:", numericTree.contains(42)); // false
console.log("Antal elementer:", numericTree.size()); // 7

console.log("\nTest af traversering:");
console.log("Elementer i orden:", numericTree.traverse());

console.log("\nTest 2: Tekststrenge");
const wordTree = new AVLTree((a, b) => a.localeCompare(b));
console.log("Tilføjer ordene: banana, apple, orange, mango");
["banana", "apple", "orange", "mango"].forEach((s) => wordTree.add(s));

console.log("\nUdskriver træet:");
wordTree.print();

console.log("\nElementer i alfabetisk orden:", wordTree.traverse());
