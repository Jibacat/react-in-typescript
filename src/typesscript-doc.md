## Some questions about Typescript 
### `type`
The current answers and the official documentation are outdated. And for those new to TypeScript, the terminology used isn't clear without examples. Below is a list of up-to-date differences.

1. Objects / Functions
Both can be used to describe the shape of an object or a function signature. But the syntax differs.

`Interface`
```
interface Point {
  x: number;
  y: number;
}

interface SetPoint {
  (x: number, y: number): void;
}
```
`Type alias`
```
type Point = {
  x: number;
  y: number;
};

type SetPoint = (x: number, y: number) => void;
```
2. Other Types
Unlike an interface, the type alias can also be used for other types such as primitives, unions, and tuples.
```
// primitive
type Name = string;

// object
type PartialPointX = { x: number; };
type PartialPointY = { y: number; };

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];
```
3. Extend
Both can be extended, but again, the syntax differs. Additionally, note that an interface and type alias are not mutually exclusive. An interface can extend a type alias, and vice versa.

Interface extends interface
```
interface PartialPointX { x: number; }
interface Point extends PartialPointX { y: number; }
```
Type alias extends type alias
```
type PartialPointX = { x: number; };
type Point = PartialPointX & { y: number; };
```
Interface extends type alias
```
type PartialPointX = { x: number; };
interface Point extends PartialPointX { y: number; }
```
Type alias extends interface
```
interface PartialPointX { x: number; }
type Point = PartialPointX & { y: number; };
```
4. Implements
A class can implement an interface or type alias, both in the same exact way. Note however that a class and interface are considered static blueprints. Therefore, they can not implement / extend a type alias that names a union type.
```
interface Point {
  x: number;
  y: number;
}

class SomePoint implements Point {
  x: 1;
  y: 2;
}

type Point2 = {
  x: number;
  y: number;
};

class SomePoint2 implements Point2 {
  x: 1;
  y: 2;
}

type PartialPoint = { x: number; } | { y: number; };

// FIXME: can not implement a union type
class SomePartialPoint implements PartialPoint {
  x: 1;
  y: 2;
}
```
5. Declaration merging
Unlike a type alias, an interface can be defined multiple times, and will be treated as a single interface (with members of all declarations being merged).
```
// These two declarations become:
// interface Point { x: number; y: number; }
interface Point { x: number; }
interface Point { y: number; }

const point: Point = { x: 1, y: 2 };
```
### `keyof`

TypeScript 2.1 publish `keyof` operator. It queries the set of keys for a given type, which is why it's also called an index type query.

- Instance 1
```
interface IProps {
    name: string;
    count: number;
}
type Key = keyof IProps; // "name | count"
let myKey: Key = "name";
```

- Instance 2
```
function getValue<T, K extends keyof T>(data: T, key: K) {
    return data[key];
};
getValue({value: '123'}, 'value'); // 123
```

