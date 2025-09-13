/**
 * @license MIT
 * @copyright 2025 Hatef Rad <hatefrad@gmail.com>
 */

/**
 * A generic, type-safe Stack (LIFO) implementation.
 * 
 * @template T The type of elements stored in the stack
 *
 * @example
 * // Create a stack from an array
 * const s = new Stack([1, 2, 3]);
 * s.push(4).pop(); // 4
 *
 * // Create a stack from any iterable
 * const s2 = Stack.from('abc');
 * s2.toArray(); // ['a', 'b', 'c']
 * 
 * // Use as iterable
 * for (const item of s) console.log(item);
 */
export class Stack<T> {
  private _elements: T[];

  /**
   * Create a new stack, optionally from any iterable.
   * @example
   * const s = new Stack([1, 2, 3]);
   * const s2 = new Stack('abc');
   */
  constructor(elements?: Iterable<T>) {
    this._elements = elements ? Array.from(elements) : [];
  }

  /**
   * Returns true if the stack is empty.
   * @example
   * const s = new Stack();
   * s.isEmpty(); // true
   */
  isEmpty(): boolean {
    return this._elements.length === 0;
  }

  /**
   * Returns the number of elements in the stack.
   * @example
   * const s = new Stack([1, 2]);
   * s.size(); // 2
   */
  size(): number {
    return this._elements.length;
  }

  /**
   * Returns the number of elements in the stack (alias for size).
   * @example
   * const s = new Stack([1, 2]);
   * s.length; // 2
   */
  get length(): number {
    return this._elements.length;
  }

  /**
   * Returns the top element, or null if empty.
   * @example
   * const s = new Stack([1, 2, 3]);
   * s.peek(); // 3
   */
  peek(): T | null {
    return this._elements.at(-1) ?? null;
  }

  /**
   * Pushes an element to the top. Returns this for chaining.
   * @example
   * const s = new Stack<number>();
   * s.push(1).push(2);
   */
  push(element: T): this {
    this._elements.push(element);
    return this;
  }

  /**
   * Removes and returns the top element, or null if empty.
   * @example
   * const s = new Stack([1, 2]);
   * s.pop(); // 2
   */
  pop(): T | null {
    return this._elements.length ? this._elements.pop() ?? null : null;
  }

  /**
   * Returns a shallow copy of the stack as an array (bottom to top).
   * @example
   * const s = new Stack([1, 2, 3]);
   * s.toArray(); // [1, 2, 3]
   */
  toArray(): T[] {
    return [...this._elements];
  }

  /**
   * Removes all elements from the stack.
   * @example
   * const s = new Stack([1, 2]);
   * s.clear();
   */
  clear(): void {
    this._elements.length = 0;
  }

  /**
   * Returns a shallow clone of the stack.
   * @example
   * const s = new Stack([1, 2]);
   * const c = s.clone();
   */
  clone(): Stack<T> {
    return new Stack(this._elements);
  }

  /**
   * Creates a stack from any iterable.
   * @example
   * const s = Stack.from([1, 2, 3]);
   * const s2 = Stack.from('abc');
   */
  static from<U>(elements: Iterable<U>): Stack<U> {
    return new Stack(elements);
  }

  /**
   * Returns a string representation of the stack.
   * @example
   * const s = new Stack([1, 2, 3]);
   * s.toString(); // 'Stack(3) [1, 2, 3]'
   */
  toString(): string {
    return `Stack(${this.size()}) [${this._elements.join(', ')}]`;
  }

  /**
   * Makes the stack iterable (bottom to top order).
   * @example
   * const s = new Stack([1, 2, 3]);
   * for (const item of s) console.log(item); // 1, 2, 3
   */
  *[Symbol.iterator](): Iterator<T> {
    yield* this._elements;
  }
}
