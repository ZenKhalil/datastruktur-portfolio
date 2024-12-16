class FixedStack {
  constructor(size) {
    this.array = new Array(size);
    this.stackpointer = 0;
    this.maxSize = size;
  }

  push(data) {
    if (this.stackpointer >= this.maxSize) {
      throw new Error("Stack overflow - stack is full");
    }
    this.array[this.stackpointer++] = data;
  }

  pop() {
    if (this.stackpointer <= 0) {
      throw new Error("Stack underflow - stack is empty");
    }
    return this.array[--this.stackpointer];
  }

  peek() {
    if (this.stackpointer <= 0) {
      throw new Error("Cannot peek - stack is empty");
    }
    return this.array[this.stackpointer - 1];
  }

  size() {
    return this.stackpointer;
  }

  get(index) {
    if (index >= this.stackpointer) {
      throw new Error("Index out of bounds");
    }
    return this.array[this.stackpointer - 1 - index];
  }

  isEmpty() {
    return this.stackpointer === 0;
  }

  isFull() {
    return this.stackpointer === this.maxSize;
  }
}

export default FixedStack;
