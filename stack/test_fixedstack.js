import FixedStack from "./fixedstack.js";

function testBasicOperations() {
  console.log("Testing basic stack operations:");
  const stack = new FixedStack(5);

  console.log("Pushing: 1, 2, 3");
  stack.push(1);
  stack.push(2);
  stack.push(3);

  console.log("Stack size:", stack.size()); // 3
  console.log("Peek:", stack.peek()); // 3

  console.log("Popping:", stack.pop()); //3
  console.log("Popping:", stack.pop()); // 2
  console.log("New size:", stack.size()); // 1
}

// Test "Hello, World!" 
function testHelloWorld() {
  console.log("\nTesting Hello, World! example:");
  const stack = new FixedStack(15);
  const text = "Hello, World!";

  console.log("Pushing:", text);
  for (const char of text) {
    stack.push(char);
  }

  let reversed = "";
  while (!stack.isEmpty()) {
    reversed += stack.pop();
  }

  console.log("Popped in reverse:", reversed);
}

function testErrorHandling() {
  console.log("\nTesting error handling:");
  const stack = new FixedStack(2);

  try {
    console.log("Testing overflow:");
    stack.push("A");
    stack.push("B");
    stack.push("C"); 
  } catch (e) {
    console.log("Caught expected overflow error:", e.message);
  }

  try {
    console.log("\nTesting underflow:");
    const emptyStack = new FixedStack(2);
    emptyStack.pop();
  } catch (e) {
    console.log("Caught expected underflow error:", e.message);
  }
}

function testGetMethod() {
  console.log("\nTesting get method:");
  const stack = new FixedStack(5);

  stack.push("A");
  stack.push("B");
  stack.push("C");

  console.log("Top element (index 0):", stack.get(0)); // C
  console.log("Second element (index 1):", stack.get(1)); // B
  console.log("Third element (index 2):", stack.get(2)); //  A
}

// Run all tests
console.log("=== Starting Stack Tests ===");
testBasicOperations();
testHelloWorld();
testErrorHandling();
testGetMethod();
console.log("=== Tests Complete ===");
