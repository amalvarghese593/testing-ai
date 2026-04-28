let x = "hello"; // Type: string
const y = "hello"; // Type: "hello" (literal type)

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
// Enums define a set of named constants — a fixed group of related values.

// 1. Numeric enums (default)
// Values auto-increment from 0:
enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}
let d = Direction.Up; // 0
let dir = Direction[0]; // "Up" (reverse mapping)
// You can set a custom start:
enum Status {
  Active = 1,
  Inactive, // 2 (auto-increments from 1)
  Pending = 10,
  loading, // 11 (auto-increments from 10)
}
enum Code {
  A, // 0
  B, // 1
  C = 100, // 100
  D, // 101 (auto-increments from 100)
  E = 1, // 1  ← same as B! (allowed but dangerous)
}
// What happens with duplicate values in reverse mapping?
Code[1]; // "E" — last one wins! (B was also 1, but E overwrites it)
// What about reverse mapping a value that no key has?
Code[999]; // undefined (no error at runtime, just undefined)

// 2. String enums
// Each member must be explicitly initialized:
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}
let c = Color.Red; // "RED"
// 3. Heterogeneous enums (mixed — not recommended)
enum Mixed {
  No = 0,
  Yes = "YES",
}
// 4. const enum — inlined at compile time
const enum Size {
  Small,
  Medium,
  Large,
}
let s = Size.Medium;
// Compiles to: let s = 1;  (no enum object at runtime)
// More performant but no reverse mapping and no runtime enum object.

// Enum vs Union type
// An alternative to enums is a union of string literals:
// Enum
enum Job {
  Dev = "dev",
  Tester = "tester",
}
// Union type (no runtime cost)
type Job = "dev" | "tester";

// An enum can be iterated over
// Iterable	Yes (Object.values(Job))

// IMPORTANT;
// Common preference: Use string unions for simple cases, enums when you need runtime access to the values
// (Ex: iterating over all options, Dynamic access const myJob="Dev"; Job[myJob]).

// 1. Type of d in let d = Direction.Up
// The inferred type is Direction, not number.
let d = Direction.Up;
// Type: Direction (specifically Direction.Up if const)
d = 0; //(special case)
d = 5; //❌ Error, only 0 can be assigned as value other than the enum
d = Direction.Down; // ✅ OK

// 3. Does reassigning a numeric enum with a number throw a compile error?
// No. This is the loosely-typed quirk:
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
let d: Direction = 99; // ✅ No error (any number is accepted)
d = -1; // ✅ No error
d = 3.14; // ✅ No error

// const enum explained
// A regular enum creates a runtime object in JavaScript:
// TypeScript
enum Direction {
  Up,
  Down,
}
let d = Direction.Up;

// Compiled JS — runtime object exists
var Direction;
(function (Direction) {
  Direction[(Direction["Up"] = 0)] = "Up";
  Direction[(Direction["Down"] = 1)] = "Down";
})(Direction || (Direction = {}));
var d = Direction.Up; // looks up the object

// A const enum is erased entirely — values are inlined:
// TypeScript
const enum Direction {
  Up,
  Down,
}
let d = Direction.Up;

// Compiled JS — no runtime object, just the value
var d = 0; // that's it!

// Can you have const string enums?
// Yes:
const enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}
let c = Color.Red;

// Compiled JS:
var c = "RED"; // inlined, no runtime object

// Dynamic access in enums
// Dynamic access means using a variable (not a hardcoded member name) to look up an enum value:
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}
// Static access (hardcoded) — always works
let c = Color.Red; // "RED"
// Dynamic access (variable key) — needs runtime object
const key = "Green";
let c2 = Color[key]; // "GREEN"

// Iterating all values (e.g., for a dropdown) --> Not possible in const enums
const options = Object.values(Color); // ["RED", "GREEN", "BLUE"]

const enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}
Object.values(Color); // ❌ Error: 'const' enums can only be used in property access
const key = "Red";
Color[key]; // ❌ Error

// 1. How to run a TS file and see console.log
// Option A: tsx (simplest, no config needed)
// npx tsx types.ts
// Option B: ts-node
// npx ts-node types.ts
// Option C: Compile then run
// npx tsc types.ts     # creates types.js
// node types.js         # run the JS
// tsx is the easiest — zero config, fast.

// 5. Structural Typing
// Structural typing means that TypeScript checks the "shape" (structure) of types, not their explicit names.
interface Dog {
  name: string;
  breed: string;
}
interface Pet {
  name: string;
  breed: string;
}
const dog: Dog = { name: "Rex", breed: "Lab" };
const pet: Pet = dog; // ✅ Works — same shape, different names
// Key points:
// Two types are compatible if they have the same properties and types, regardless of their names.
// A type with more properties is assignable to one with fewer (excess properties are allowed when assigning variables, not object literals).
const pet2: Pet = { name: "Rex", breed: "Lab", age: 5 }; // ❌ Error — excess 'age'
const pet4: Pet = { name: "Rex", breed: "Lab", age: 5 } as Pet; // ✅ Allowed due to type assertion
// When you assign an object literal directly to a variable with a type, TypeScript checks for excess properties.
const obj = { name: "Rex", breed: "Lab", age: 5 };
const pet3: Pet = obj; // ✅ Works — no excess check on variables
// Both pet2, pet3 satisfy structural typing because both contains all properties in Pet interface.
// But error is thrown because of excess property checking. Excess property checking does not apply to variable assignments but only to object literals.
function makePerson(): Pet {
  const res = { name: "Eve", breed: "Lab", age: 22 };
  return res; // ✅ Allowed
}
function makePerson2(): Pet {
  return { name: "Eve", breed: "Lab", age: 22 }; // ❌ Error
}
function greet(p: Person) {
  /* ... */
}
greet({ name: "Bob", age: 25 }); // ❌ Error (direct object literal, excess property check)
const someone = { name: "Bob", age: 25 };
greet(someone); // ✅ Allowed

// IMPORTANT: Object literal may only specify known properties(ie properties defined in type)
// If we want to allow extra properties in object literal we need to use TYPE ASSERTION (as keyword)
const data3: Pet = { name: "Max", breed: "Lab", age: "1" } as Pet; // ✅ Allowed

class Dog1 {
  name: string = "";
}
class Cat {
  name: string = "";
}
let d3: Dog1 = new Cat(); // ✅ Allowed (same structure)

// Type Assertion (as keyword) -- Overlap needed bw 2 types(One has to be subset of the other. Just intersection like in Venn diagram not allowed)
// It tells TypeScript: "Trust me, I know the type."
// It does not change the runtime value or do any type conversion—it only affects how TypeScript checks your code.
// It’s a way to override TypeScript’s inferred type for a variable or expression.
// You use it when you know more about the type than TypeScript does.
// It’s similar to type casting in other languages, but it doesn’t actually convert the value.
// You still need the required properties if excess properties are present. Overlap needed bw 2 types
const data: Pet = { name: "Max" } as Pet; // ✅ Allowed (required property NOT present. overlap present bw 2 types)
const data: Pet = { name: "Max", breed: "asa", age: "1" } as Pet; // ✅ Allowed (All required properties are present, also extra property present. overlap present bw 2 types)
const data: Pet = { name: "Max", age: "1" } as Pet; // ❌ Error (required property NOT present but extra property present. No overlap present bw 2 types)
const data: Pet = { name: "Max", age: "1" } as unknown as Pet; // ✅ Allowed

// When to Use Type Assertion ?
// When you get data from a source with an unknown type (like any or from JSON).
// When you know the type better than TypeScript (e.g., DOM elements, API responses).
const input = document.getElementById("myInput") as HTMLInputElement;
input.value = "TypeScript!";
// Here, TypeScript only knows input is an HTMLElement, but you assert it’s an HTMLInputElement to access .value.

// Important Notes
// No runtime effect: Type assertion only affects compile-time checks.
// Be careful: If you assert the wrong type, you might get runtime errors.
