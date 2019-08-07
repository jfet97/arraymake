const { arrayMake } = require("../src/functional.js");

describe("sanity check", () => {
  test('should pass', () => {
    expect(true).toBe(true);
  });
});

describe("arrayMake", () => {

  test('should return an empty array because the length argument is implicitly undefined', () => {
    expect(arrayMake()).toEqual([]);
  });

  test('should return an empty array because the length argument is explicitly undefined', () => {
    expect(arrayMake()).toEqual([]);
  });

  test('should properly detect a wrong length argument because it is null', () => {
    expect(() => {
      arrayMake(null);
    }).toThrow(TypeError);
  });

  test('should properly detect a wrong length argument because it is an object', () => {
    expect(() => {
      arrayMake({});
    }).toThrow(TypeError);
  });

  test('should properly detect a wrong length argument because it is an array', () => {
    expect(() => {
      arrayMake([]);
    }).toThrow(TypeError);
  });

  test('should properly detect a wrong length argument because it is a function', () => {
    expect(() => {
      arrayMake(() => { });
    }).toThrow(TypeError);
  });

  test('should properly detect a wrong length argument because it is a Symbol', () => {
    expect(() => {
      arrayMake(Symbol());
    }).toThrow(TypeError);
  });

  test('should properly detect a wrong length argument because it is NaN', () => {
    expect(() => {
      arrayMake(NaN);
    }).toThrow(TypeError);
  });

  test('should properly detect a wrong length argument because it is Infinity', () => {
    expect(() => {
      arrayMake(Infinity);
    }).toThrow(TypeError);
  });

  test('should properly detect a wrong length argument because it is less than 0', () => {
    expect(() => {
      arrayMake(-1);
    }).toThrow(TypeError);
  });

  test('should properly detect a wrong length argument because it is not integer', () => {
    expect(() => {
      arrayMake(3.1415);
    }).toThrow(TypeError);
  });

  test('should properly detect a wrong length argument because it is a string not convertible to a numerical value', () => {
    expect(() => {
      arrayMake("q");
    }).toThrow(TypeError);
  });

  test('should return an empty array', () => {
    expect(arrayMake(0)).toEqual([]);
  });

  test('should return an array with 5 undefined elements', () => {
    expect(arrayMake(5)).toEqual([...Array(5)]);
  });

  test('should accept a string value for the length property if it is convertible into a valid number', () => {
    expect(arrayMake("5")).toEqual([...Array(5)]);
  });

  test('should properly detect a wrong second argument because it is an object', () => {
    expect(() => {
      arrayMake(1, {});
    }).toThrow(TypeError);
  });

  test('should properly detect a wrong second argument because it is an array', () => {
    expect(() => {
      arrayMake(1, []);
    }).toThrow(TypeError);
  });

  test('should return an array with 5 null elements', () => {
    expect(arrayMake(5, null)).toEqual([null, null, null, null, null]);
  });

  test('should return an array with 5 number 42 elements', () => {
    expect(arrayMake(5, 42)).toEqual([42, 42, 42, 42, 42]);
  });

  test('should return an array with 5 string elements', () => {
    expect(arrayMake(5, "hi")).toEqual(["hi", "hi", "hi", "hi", "hi"]);
  });

  test('should return an array with 5 Symbol elements', () => {
    const s = Symbol();
    expect(arrayMake(5, s)).toEqual([s, s, s, s, s]);
  });

  test('should return an array with 5 true elements', () => {
    expect(arrayMake(5, true)).toEqual([true, true, true, true, true]);
  });

  test('should return an array with 5 false elements', () => {
    const s = Symbol();
    expect(arrayMake(5, false)).toEqual([false, false, false, false, false]);
  });

  test('should call the mapperFn 5 times', () => {
    const mockFn = jest.fn();
    arrayMake(5, mockFn);
    expect(mockFn).toHaveBeenCalledTimes(5);
  });

  test('the mapperFn should act like a factory', () => {
    const value = {};
    const factory = () => value;
    const res = arrayMake(5, factory);
    expect(res).toEqual([value, value, value, value, value]);
  });

  test('each fresh non-primitive value returned by a factory must be unique', () => {
    const factory = () => ({});
    const res = arrayMake(5, factory);
    expect(res.indexOf(res[0])).toBe(0);
    expect(res.indexOf(res[1])).toBe(1);
    expect(res.indexOf(res[2])).toBe(2);
    expect(res.indexOf(res[3])).toBe(3);
    expect(res.indexOf(res[4])).toBe(4);
  });

  test('the mapperFn should receive always undefined as first argument', () => {
    let isAlwaysUndefined = true;
    const factory = first => {
      if (first !== void 0) isAlwaysUndefined = false;
    };
    arrayMake(5, factory);
    expect(isAlwaysUndefined).toBe(true);
  });

  test('the mapperFn should receive the current index as second argument', () => {
    let indexes = [];
    const factory = (_, i) => {
      indexes.push(i);
    };
    arrayMake(5, factory);
    expect(indexes).toEqual([0, 1, 2, 3, 4]);
  });

  test('the mapperFn should receive the array in construction as third argument', () => {
    let receivedArray;
    const factory = (_, i, array) => {
      receivedArray = array;
    };
    const res = arrayMake(1, factory);
    expect(res).toEqual(receivedArray);
  });


});
