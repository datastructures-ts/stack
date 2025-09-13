import { describe, it, expect, beforeEach } from 'vitest';
import { Stack } from '../src/stack.js';

describe('Stack', () => {
  let stack: Stack<number | string | boolean>;

  beforeEach(() => {
    stack = new Stack<number | string>();
  });

  describe('constructor', () => {
    it('should create an empty stack by default', () => {
      const emptyStack = new Stack<number>();
      expect(emptyStack.isEmpty()).toBe(true);
      expect(emptyStack.size()).toBe(0);
    });

    it('should create a stack with initial elements', () => {
      const prefilledStack = new Stack([1, 2, 3]);
      expect(prefilledStack.size()).toBe(3);
      expect(prefilledStack.peek()).toBe(3);
    });

    it('should handle readonly arrays', () => {
      const readonlyArray = [1, 2, 3] as const;
      const stack = new Stack(readonlyArray);
      expect(stack.size()).toBe(3);
    });
  });

  describe('push', () => {
    it('should push elements to the top of the stack', () => {
      stack.push(1);
      stack.push(2);
      stack.push('3rd');

      expect(stack.size()).toBe(3);
      expect(stack.peek()).toBe('3rd');
    });

    it('should allow method chaining', () => {
      const result = stack.push(1).push(2).push(3);
      expect(result).toBe(stack);
      expect(stack.size()).toBe(3);
    });

    it('should handle different types in generic stack', () => {
      const mixedStack = new Stack<number | string>();
      mixedStack.push(1).push('hello').push(42);
      expect(mixedStack.toArray()).toEqual([1, 'hello', 42]);
    });
  });

  describe('size', () => {
    it('should return 0 for empty stack', () => {
      expect(stack.size()).toBe(0);
    });

    it('should return correct size after operations', () => {
      stack.push(1).push(2).push(3);
      expect(stack.size()).toBe(3);
      
      stack.pop();
      expect(stack.size()).toBe(2);
    });
  });

  describe('isEmpty', () => {
    it('should return true for empty stack', () => {
      expect(stack.isEmpty()).toBe(true);
    });

    it('should return false for non-empty stack', () => {
      stack.push(1);
      expect(stack.isEmpty()).toBe(false);
    });

    it('should return true after clearing', () => {
      stack.push(1).push(2);
      stack.clear();
      expect(stack.isEmpty()).toBe(true);
    });
  });

  describe('peek', () => {
    it('should return null for empty stack', () => {
      expect(stack.peek()).toBeNull();
    });

    it('should return the top element without removing it', () => {
      stack.push(1).push(2).push('top');
      
      expect(stack.peek()).toBe('top');
      expect(stack.size()).toBe(3); // Size unchanged
    });

    it('should always return the most recently pushed element', () => {
      stack.push('first');
      expect(stack.peek()).toBe('first');
      
      stack.push('second');
      expect(stack.peek()).toBe('second');
    });
  });

  describe('pop', () => {
    it('should return null for empty stack', () => {
      expect(stack.pop()).toBeNull();
    });

    it('should remove and return the top element', () => {
      stack.push(1).push(2).push('top');
      
      expect(stack.pop()).toBe('top');
      expect(stack.size()).toBe(2);
      expect(stack.peek()).toBe(2);
    });

    it('should handle multiple pops correctly', () => {
      stack.push(1).push(2).push(3);
      
      expect(stack.pop()).toBe(3);
      expect(stack.pop()).toBe(2);
      expect(stack.pop()).toBe(1);
      expect(stack.pop()).toBeNull(); // Empty stack
    });
  });

  describe('toArray', () => {
    it('should return empty array for empty stack', () => {
      expect(stack.toArray()).toEqual([]);
    });

    it('should return array copy of elements', () => {
      stack.push(1).push(2).push('3rd');
      const array = stack.toArray();
      
      expect(array).toEqual([1, 2, '3rd']);
      
      // Modifying returned array shouldn't affect stack
      array.push('modified');
      expect(stack.size()).toBe(3);
      expect(stack.toArray()).toEqual([1, 2, '3rd']);
    });

    it('should preserve element order (bottom to top)', () => {
      const elements = ['bottom', 'middle', 'top'];
      elements.forEach(el => stack.push(el));
      
      expect(stack.toArray()).toEqual(elements);
      expect(stack.peek()).toBe('top');
    });
  });

  describe('clear', () => {
    it('should clear all elements', () => {
      stack.push(1).push(2).push(3);
      stack.clear();
      
      expect(stack.isEmpty()).toBe(true);
      expect(stack.size()).toBe(0);
      expect(stack.peek()).toBeNull();
    });

    it('should work on already empty stack', () => {
      stack.clear();
      expect(stack.isEmpty()).toBe(true);
    });
  });

  describe('clone', () => {
    it('should create independent copy', () => {
      stack.push(1).push(2).push(3);
      const clone = stack.clone();
      
      // Modify clone
      clone.pop();
      clone.push('new');
      
      // Original unchanged
      expect(stack.peek()).toBe(3);
      expect(stack.size()).toBe(3);
      
      // Clone modified
      expect(clone.peek()).toBe('new');
      expect(clone.size()).toBe(3);
    });

    it('should clone empty stack', () => {
      const clone = stack.clone();
      expect(clone.isEmpty()).toBe(true);
      expect(clone.size()).toBe(0);
    });
  });

  describe('from', () => {
    it('should create stack from array', () => {
      const arr = [1, 2, 3, 4];
      const stackFromArray = Stack.from(arr);
      expect(stackFromArray.size()).toBe(4);
      expect(stackFromArray.peek()).toBe(4);
      expect(stackFromArray.toArray()).toEqual(arr);
    });

    it('should handle empty array', () => {
      const stackFromArray = Stack.from([]);
      expect(stackFromArray.isEmpty()).toBe(true);
    });

    it('should not modify original array', () => {
      const arr = [1, 2, 3];
      const stackFromArray = Stack.from(arr);
      stackFromArray.push(4);
      expect(arr).toEqual([1, 2, 3]); // Original unchanged
    });

    it('should create stack from string (iterable)', () => {
      const stackFromString = Stack.from('abc');
      expect(stackFromString.toArray()).toEqual(['a', 'b', 'c']);
      expect(stackFromString.peek()).toBe('c');
    });
  });

  describe('toString', () => {
    it('should return string representation', () => {
      stack.push(1).push(2).push(3);
      expect(stack.toString()).toBe('Stack(3) [1, 2, 3]');
    });

    it('should handle empty stack', () => {
      expect(stack.toString()).toBe('Stack(0) []');
    });

    it('should handle mixed types', () => {
      stack.push(1).push('hello').push(true);
      expect(stack.toString()).toBe('Stack(3) [1, hello, true]');
    });
  });

  describe('type safety', () => {
    it('should work with number type', () => {
      const numberStack = new Stack<number>();
      numberStack.push(1).push(2).push(3);
      
      const popped = numberStack.pop();
      expect(typeof popped).toBe('number');
      expect(popped).toBe(3);
    });

    it('should work with string type', () => {
      const stringStack = new Stack<string>();
      stringStack.push('hello').push('world');
      
      const peeked = stringStack.peek();
      expect(typeof peeked).toBe('string');
      expect(peeked).toBe('world');
    });

    it('should work with object type', () => {
      interface TestObject {
        id: number;
        name: string;
      }
      
      const objectStack = new Stack<TestObject>();
      const obj1 = { id: 1, name: 'test1' };
      const obj2 = { id: 2, name: 'test2' };
      
      objectStack.push(obj1).push(obj2);
      
      expect(objectStack.peek()).toEqual(obj2);
      expect(objectStack.size()).toBe(2);
    });
  });

  describe('length getter', () => {
    it('should return same value as size()', () => {
      expect(stack.length).toBe(0);
      stack.push(1).push(2);
      expect(stack.length).toBe(2);
      expect(stack.length).toBe(stack.size());
    });
  });

  describe('iterator', () => {
    it('should be iterable with for...of', () => {
      const numberStack = new Stack([1, 2, 3]);
      const items: number[] = [];
      for (const item of numberStack) {
        items.push(item);
      }
      expect(items).toEqual([1, 2, 3]);
    });

    it('should work with spread operator', () => {
      const stringStack = new Stack(['a', 'b', 'c']);
      const items = [...stringStack];
      expect(items).toEqual(['a', 'b', 'c']);
    });

    it('should work with Array.from', () => {
      const numberStack = new Stack([10, 20]);
      const items = Array.from(numberStack);
      expect(items).toEqual([10, 20]);
    });
  });
});
