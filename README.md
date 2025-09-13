# @datastructures-ts/stack

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A type-safe, generic Stack data structure implementation in TypeScript following the LIFO (Last In, First Out) principle.

## Features

- 🔒 **Type-safe**: Full TypeScript support with generic types
- 🚀 **Performance**: Optimized for speed and memory efficiency
- 🧪 **Well-tested**: Comprehensive test coverage with Vitest
- 📚 **Well-documented**: Complete JSDoc documentation
- 🔗 **Method chaining**: Fluent API for better developer experience
- 📦 **Multiple formats**: CommonJS and ESM support
- 🌳 **Tree-shakeable**: Only import what you need

## Installation

```bash
pnpm add @datastructures-ts/stack
```

## Usage

### Basic Usage

```typescript
import { Stack } from '@datastructures-ts/stack';

// Create an empty stack
const stack = new Stack<number>();

// Push elements
stack.push(1).push(2).push(3);

// Peek at the top element
console.log(stack.peek()); // 3

// Pop elements
console.log(stack.pop()); // 3
console.log(stack.pop()); // 2

// Check size and emptiness
console.log(stack.size()); // 1
console.log(stack.isEmpty()); // false
```

### Initialize with Data

```typescript
// Create stack with initial elements
const stack = new Stack([1, 2, 3, 4, 5]);
console.log(stack.peek()); // 5 (top element)

// Create from array
const fromArray = Stack.fromArray(['a', 'b', 'c']);
console.log(fromArray.toArray()); // ['a', 'b', 'c']
```

### Type Safety

```typescript
// Number stack
const numberStack = new Stack<number>();
numberStack.push(42);

// String stack
const stringStack = new Stack<string>();
stringStack.push('hello');

// Object stack
interface User {
  id: number;
  name: string;
}

const userStack = new Stack<User>();
userStack.push({ id: 1, name: 'John' });

// Mixed types
const mixedStack = new Stack<number | string>();
mixedStack.push(1).push('hello').push(42);
```

### Advanced Operations

```typescript
const stack = new Stack([1, 2, 3, 4, 5]);

// Convert to array
const array = stack.toArray(); // [1, 2, 3, 4, 5]

// Clone the stack
const clone = stack.clone();
clone.push(6);
console.log(stack.size()); // 5 (original unchanged)
console.log(clone.size()); // 6

// Clear all elements
stack.clear();
console.log(stack.isEmpty()); // true

// String representation
const stack2 = new Stack([1, 2, 3]);
console.log(stack2.toString()); // "Stack(3) [1, 2, 3]"
```

## API Reference

### Constructor

- `new Stack<T>(elements?: readonly T[])` - Creates a new stack with optional initial elements

### Methods

- `push(element: T): this` - Adds element to top of stack (chainable)
- `pop(): T | null` - Removes and returns top element, or null if empty
- `peek(): T | null` - Returns top element without removing it, or null if empty
- `size(): number` - Returns number of elements in the stack
- `isEmpty(): boolean` - Returns true if stack is empty
- `toArray(): T[]` - Returns shallow copy of elements as array
- `clear(): void` - Removes all elements from the stack
- `clone(): Stack<T>` - Creates a shallow copy of the stack
- `toString(): string` - Returns string representation of the stack

### Static Methods

- `Stack.fromArray<T>(elements: readonly T[]): Stack<T>` - Creates stack from array

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests in watch mode
pnpm run test:watch

# Run tests with coverage
pnpm run test:coverage

# Build the package
pnpm run build

# Lint code
pnpm run lint

# Type check
pnpm run typecheck
```

## License

MIT © [Hatef Rad](https://github.com/hatefrad)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
