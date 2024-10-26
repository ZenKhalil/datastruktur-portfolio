const Stack = require("./stack.js");

// Lav en ny stack
const stack = new Stack();

console.log("Starter med en tom stack...");

// Tilføj nogle tal
stack.push(10); // Tilføjet 10
stack.push(20); // Tilføjet 20
stack.push(30); // Tilføjet 30

// Tjek hvor mange der er
stack.size(); // Forvent: 3

// Kig på toppen
stack.peek(); // Forvent: 30

// Hent element på indeks 0
stack.get(0); // Forvent: 30

// Fjern det øverste element
stack.pop(); // Fjernet 30

// Tjek størrelsen igen
stack.size(); // Forvent: 2

// Prøv at kigge på toppen igen
stack.peek(); // Forvent: 20

// Tester ekstra funktioner
stack.isEmpty(); // Tjek om stacken er tom. Forvent: false
stack.clear(); // Ryd stacken. Stacken er ryddet
stack.isEmpty(); //  Tjek om tom igen. Forvent: true
stack.pop(); //Prøv at poppe fra en tom stack. Forvent: null
