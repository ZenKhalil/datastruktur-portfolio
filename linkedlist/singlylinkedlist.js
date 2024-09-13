export default class SinglyLinkedList {
    constructor() {
        this.head = null; // Første node i listen
        this.size = 0;    // Antal nodes i listen
    }
    
    // Tilføj en ny node med data
    add(data) {
        const newNode = new Node(data); // Lav en ny node
            console.log('Adding node with data:', data); // Debugging line
        if (!this.head) {
            this.head = newNode; // Hvis listen er tom, sæt newNode som head
        } else {
            let current = this.head;
            // Gå til sidste node
            while (current.next) {
                current = current.next;
            }
            current.next = newNode; // Tilføj newNode i slutningen
        }
        this.size = this.size + 1; // Opdater størrelsen manuelt
        console.log('Current size after adding:', this.size); // Debugging line
    }
    
    // Fjerner en node med bestemt data
    remove(data) {
        if (!this.head) return null; // Listen er tom, gør ingenting
        
        // Hvis det er head, der skal fjernes
        if (this.head.data === data) {
            this.head = this.head.next;
            this.size = this.size - 1; // Opdater størrelsen manuelt
            console.log('Removed node with data:', data); // Debugging line
            return;
        }
        
        let current = this.head;
        // Find noden lige før den vi vil fjerne
        while (current.next && current.next.data !== data) {
            current = current.next;
        }
        
        // Hvis vi fandt noden, fjern den
        if (current.next) {
            current.next = current.next.next; // Spring over den node vi vil fjerne
            this.size = this.size - 1; // Opdater størrelsen manuelt
            console.log('Removed node with data:', data); // Debugging line
        }
        console.log('Current size after removal:', this.size); // Debugging line
    }
    
    
    // Returner data fra første node
    getFirst() {
        return this.head ? this.head.data : null;
    }
    
    // Returner data fra sidste node
    getLast() {
        if (!this.head) return null;
        let current = this.head;
        while (current.next) {
            current = current.next; // Gå til sidste node
        }
        return current.data;
    }

    // Få den første node
    getFirstNode() {
        return this.head;
    }
    
    // Få næste node efter en given node
    getNextNode(node) {
        return node ? node.next : null;
    }
    
    // Fjern første node
    removeFirstNode() {
        if (this.head) {
            this.head = this.head.next; // Fjern head ved at hoppe til næste node
            this.size = this.size - 1; // Opdater størrelsen manuelt
        }
    }
    
    // Fjern sidste node
    removeLastNode() {
        if (!this.head) return; // Hvis listen er tom, gør ingenting
        
        if (!this.head.next) {
            this.head = null; // Hvis der kun er én node, fjern den
        } else {
            let current = this.head;
            // Find næstsidste node
            while (current.next && current.next.next) {
                current = current.next;
            }
            current.next = null; // Fjern sidste node
        }
        this.size = this.size - 1; // Opdater størrelsen manuelt
    }
    
    // Tøm hele listen
    clear() {
        this.head = null;
        this.size = 0;
    }
    
    // Returner størrelsen af listen
    getSize() {
        return this.size;
    }
    
    // Print hele listen
    dumpList() {
        let current = this.head;
        while (current) {
            console.log(current.data); // Print data i hver node
            current = current.next; // Gå til næste node
        }
    }
}

class Node {
  constructor(data) {
    this.data = data; // Data, som noden indeholder
    this.next = null; // Refererer til næste node
  }
}
