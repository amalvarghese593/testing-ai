type Job = "dev" | "tester"; // -> Type alias
// This is a kind of type declaration, not a type annotation.
// Type alias is a subset of type declaration.
// Type declaration is the broad term for any statement that defines a type: type, interface, enum, class (its shape).
// Type alias specifically refers to the type keyword — it gives a name to any type expression.

// Only type alias can do this:
type Status = "active" | "inactive"; // union type
type Pair = [string, number]; //-> tuple

// Only interface can do this (declaration merging): ie we can redeclare interface multiple times
interface Window {
  title: string;
}
interface Window {
  size: number;
}
// Window now has both title and size

// Extending types
// type B = A & { age: number }; (intersection)
// interface B extends A { age: number }

// 1. Class as a type
// A class in TypeScript acts as both a value and a type. You can use the class name as a type annotation.
class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
let u: User = new User("Alice"); // User is used as a type here

// 2. Declaration merging (interface only)
// You can declare the same interface multiple times — TypeScript merges them into one.
interface User {
  name: string;
}
interface User {
  age: number;
}
// User now has BOTH properties
let u1: User = { name: "Alice", age: 30 }; // both required

// 3. implements
// A class can implement an interface or type alias, meaning it promises to have all the declared properties/methods.
interface Animal {
  name: string;
  speak(): void;
}
class Dog implements Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  speak() {
    console.log("Woof");
  }
}
// Also works with type aliases:
type Runnable = { run(): void };
class Car implements Runnable {
  run() {
    console.log("Vroom");
  }
}

// Function types in objects
// Two syntaxes — both work in type, interface, and class:
// 1. Method shorthand
interface User {
  greet(name: string): string;
  bark(): void;
}
// 2. Property with function type (arrow syntax)
interface User {
  greet: (name: string) => string;
  bark: () => void;
}

// 1. Primitive Types
// Due to type inference ts compiler can infer the type. It's recommended not to specify the type in this case.
// Ex: const num: number = 40 (Here no need to specify type as number)
let firstName: string;
let age: number;
let isDev: boolean;
let res: undefined;
let marks: null;
let largeNumber: bigint;
let id: symbol;

// 2. Type Annotation
// Type annotation means explicitly specifying the type of a variable or function parameter.
// TypeScript can also infer types without annotations (let x = 5 is inferred as number),
// so annotations are most useful when:
// The type can't be inferred (e.g., function parameters)
// You want to be explicit for readability
// You need a broader type than what would be inferred (let id: string | number = 123)

let score: number = 100; // 'score' must always be a number

function greet(name: string): void {
  console.log("Hello, " + name);
}

// 3. Type Inference
// Type inference is when TypeScript automatically figures out the type based on the value assigned.
let city = "London"; // TypeScript infers 'city' is a string
let count = 10; // TypeScript infers 'count' is a number

// If you try to assign a different type later, TypeScript will show an error:
city = 123; // ❌ Error: Type 'number' is not assignable to type 'string'

// 4. Enums
// Enums (short for "enumerations") let you define a set of named constants. Useful for representing a fixed set of options.
