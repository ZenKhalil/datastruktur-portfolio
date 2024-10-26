// Node-klassen, som repræsenterer hvert element i vores stack
class Node {
  /**
   * Opretter en ny node til stacken
   * @param {*} data - Data, der skal gemmes i noden
   * @param {Node|null} next - Referencen til næste node
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

// Stack-klassen, som fungerer som en simpel stak
class Stack {
  constructor() {
    this.tail = null; // Henviser til den øverste node i stacken
    this._size = 0; // Holder styr på hvor mange elementer der er
  }

  /**
   * Tilføjer et element til toppen af stacken
   * @param {*} data - Dataen, der skal tilføjes
   */
  push(data) {
    const newNode = new Node(data, this.tail); // Opretter en ny node
    this.tail = newNode; // Opdaterer den øverste node
    this._size++; // Øger størrelsen
    console.log(`Har tilføjet ${data} til stacken.`);
  }

  /**
   * Fjerner og returnerer det øverste element fra stacken
   * @returns {*} - Dataen fra den fjernede node, eller null hvis stacken er tom
   */
  pop() {
    if (this.tail === null) {
      console.log("Stacken er tom. Intet at fjerne.");
      return null; // Tom stack
    }
    const poppedData = this.tail.data; // Gemmer data fra den øverste node
    this.tail = this.tail.next; // Flytter til næste node
    this._size--; // Formindsker størrelsen
    console.log(`Har fjernet ${poppedData} fra stacken.`);
    return poppedData;
  }

  /**
   * Ser på det øverste element uden at fjerne det
   * @returns {*} - Dataen fra den øverste node, eller null hvis stacken er tom
   */
  peek() {
    if (this.tail === null) {
      console.log("Stacken er tom. Intet at se på.");
      return null; // Tom stack
    }
    console.log(`Toppen af stacken er ${this.tail.data}.`);
    return this.tail.data;
  }

  /**
   * Returnerer hvor mange elementer der er i stacken
   * @returns {number} - Størrelsen af stacken
   */
  size() {
    console.log(`Der er ${this._size} elementer i stacken.`);
    return this._size;
  }

  /**
   * Henter elementet på en given position i stacken
   * @param {number} index - Positionen i stacken (0 er toppen)
   * @returns {*} - Dataen på den givne position, eller null hvis indekset er ugyldigt
   */
  get(index) {
    if (index < 0 || index >= this._size) {
      console.log(
        `Ugyldigt indeks ${index}. Stackens størrelse er ${this._size}.`
      );
      return null; // Ugyldigt indeks
    }

    let current = this.tail; // Starter fra toppen
    let currentIndex = 0;

    while (currentIndex < index) {
      current = current.next; // Bevæg dig ned i stacken
      currentIndex++;
    }

    console.log(`Elementet på indeks ${index} er ${current.data}.`);
    return current.data;
  }

  /**
   * Tjekker om stacken er tom
   * @returns {boolean} - True hvis stacken er tom, ellers false
   */
  isEmpty() {
    const empty = this._size === 0;
    console.log(`Stacken er ${empty ? "tom" : "ikke tom"}.`);
    return empty;
  }

  /**
   * Rydder alle elementer fra stacken
   */
  clear() {
    this.tail = null;
    this._size = 0;
    console.log("Stacken er nu ryddet.");
  }
}

// Eksporter Stack-klassen
if (typeof module !== "undefined" && module.exports) {
  module.exports = Stack;
}
