Array.make = Array.make || function (length, primitiveValueOrMapperFn) {

  var argumentsObjectLength = arguments.length;

  // undefined means absence of value
  var lengthArgumentWasProvided = argumentsObjectLength > 0 && length !== void 0;
  var primitiveValueOrMapperFnWasProvided = argumentsObjectLength > 1 && primitiveValueOrMapperFn !== void 0;

  var t_length = typeof length;

  var t_primitiveValueOrMapperFn = typeof primitiveValueOrMapperFn;
  var t_primitiveValueOrMapperFn_isObject = primitiveValueOrMapperFn && t_primitiveValueOrMapperFn === "object";
  var t_primitiveValueOrMapperFn_isFunction = t_primitiveValueOrMapperFn === "function";

  if (lengthArgumentWasProvided) {

    // allow coercion from string values
    if (t_length === "string") {
      length = Number(length);
      t_length = "number";
    }

    if (
      t_length !== "number" ||
      length !== length || // avoid NaN
      length === Infinity || // too high
      Math.floor(length) !== length || // no integer
      length < 0 // no sense
    ) {
      throw TypeError("Invalid value for argument length");
    }
  } else {
    // default value for length is 0
    length = 0;
  }

  // arrayToBeReturned contains 'length' undefined
  var arrayToBeReturned = Array.apply(null, Array(length));

  if (primitiveValueOrMapperFnWasProvided) {
    if (
      t_primitiveValueOrMapperFn_isObject
    ) {
      throw TypeError("Non primitives values are not allowed to fill the Array. Use a factory function instead.");
    }

    for (var i = 0; i < length; i++) {
      arrayToBeReturned[i] =
        t_primitiveValueOrMapperFn_isFunction
          ?
          primitiveValueOrMapperFn(void 0, i, arrayToBeReturned)
          :
          primitiveValueOrMapperFn;
    }

  }

  return arrayToBeReturned;
}
