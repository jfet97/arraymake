# arraymake

## introduction

A new ES3 compliant static method for the Array constructor that let you create an array with predefined length and filling values.

```js
Array.make(3, 42); // [42, 42, 42]

Array.make(3, (_, i) => i); // [0, 1, 2]

Array.make(3, () => ({ safe: true })); // [{ safe: true }, { safe: true }, { safe: true }]
```

## installation

Install it from __npm__:
```sh
$ npm i -S arraymake
```

then import it:
```js
import "arraymake";

require("arraymake");
```

##  motivation

Currently there isn't a way to create an array by pre-setting its length and an optional filling value that is both straightforward and safe.\
We pass from cryptic and verbous solutions like `Array.apply(null, Array(N)).map(mapperFn)`, to only verbous solution like `Array.from({length:N}, mapperFn)` and `[...Array(N)].map(mapperFn)` or a dangerous one like `Array(N).fill(value)`.

Why is the last dangerous? Spot the bug here:
```js
const grid = Array(2).fill(Array(2).fill(false));

grid[0][0] = true;
grid[0][1] = true;

console.log(String(grid));
// why is true, true, true, true
// instead of true, true, false, false?
```

## solution
The new static method was developed with safety and simplicity in mind, without straying too far from the dynamic nature of the language.

Calling `Array.make` without arguments is allowed and an empty array is returned:
```js
Array.make(); // []
```
Remember that `undefined` means the absence of value in JavaScript:
```js
Array.make(undefined); // []
```

If provided, the first argument should be a `number` or a `string` coercible into a valid numeric value. There are some restriction about the numeric values to be considered valid: the value should be different from `NaN`, positive and finite:
```js
Array.make(NaN); // TypeError
Array.make(Infinite); // TypeError
Array.make(-1); // TypeError
Array.make(null); // TypeError
Array.make({}); // TypeError
Array.make([]); // TypeError
Array.make(() => {}); // TypeError
Array.make(Symbol()); // TypeError
Array.make("foo"); // TypeError

Array.make(0); // Ok
Array.make(10); // Ok
Array.make("42"); // Ok
```

The default value used to fill the array is `undefined`. Forget about `empty slots`:
```js
Array.make(5); // [undefined, undefined, undefined, undefined, undefined]
```

The second argument is used to set the filling value/values:
```js
Array.make(5, "foo"); // ["foo", "foo", "foo", "foo", "foo"]
```

To avoid the `Array.prototype.fill` dangerousness, you cannot pass an object nor an array as second argument:
```js
Array.make(5, {}); // TypeError
Array.make(5, []); // TypeError
```
That will prevent creating an array with more than one reference to the same entity.\
This is an unwelcome behavior intrinsically linked to the `fill` method; something that should be clearly reported with an exception instead of being allowed, causing hard to catch bugs.

When you need to fill the array with non primitive entities, pass a function as second argument. It will act both as a factory function and a mapper function:
```js
Array.make(3, (_, index, arrayUnderCostruction) => ({ safe: true, id: index }));
// [{ safe: true, id: 0 }, { safe: true, id: 1 }, { safe: true, id: 2 }]
```

## pitfalls

Yes, I'm adding a static method to a native entity. If you don't like this approach, don't use my package.\
I don't think that such a method will be ever added to the language, but if it were so I'm sure that a different name will be chosen. Like `fromLength`.
TC39 i going to hate me for this..\
\
Peace ✌🏻.