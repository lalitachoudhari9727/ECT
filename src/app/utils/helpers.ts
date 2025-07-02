// @ts-nocheck
export function deepCopy(obj, hash = new Map()) {
  // Handle null or primitive types
  if (obj === null || typeof obj !== 'object') return obj;

  // Handle circular references
  if (hash.has(obj)) return hash.get(obj);

  // Handle Date
  if (obj instanceof Date) return new Date(obj);

  // Handle Array
  if (Array.isArray(obj)) {
    const arr = [];
    hash.set(obj, arr);
    obj.forEach((item, i) => {
      arr[i] = deepCopy(item, hash);
    });
    return arr;
  }

  // Handle Function (copy as reference)
  if (typeof obj === 'function') return obj;

  // Handle Object
  const clone = {};
  hash.set(obj, clone);
  Object.keys(obj).forEach(key => {
    clone[key] = deepCopy(obj[key], hash);
  });
  return clone;
}

export function check(a,b) {

// null,defined treat as equal
 if(a==null && b ===null) {
    return true;
 }

 if(typeof a != typeof b) return false;

// check primitive types
 if(typeof a!= 'object' ){
    return a===b;
 }

//check date
if(a instanceof Date && b instanceof Date) {
   return a.getTime() === b.getTime();
}

if (a == null || b == null) return false; 

//check for array
if(Array.isArray(a) && Array.isArray(b)) {
    if(a.length != b.length) return false;
    return a.every((item,i)=> check(item,b[i]))
}

 if (Array.isArray(a) !== Array.isArray(b)) return false;

  // Objects
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const key of keys) {
    const valA = a.hasOwnProperty(key) ? a[key] : undefined;
    const valB = b.hasOwnProperty(key) ? b[key] : undefined;

    // Treat null and undefined as equal
    if (valA == null && valB == null) continue;

    if (!check(valA, valB)) return false;
  }

  return true;
}

export function execute(code, variables = {}) {
  const $math = {
    sum: (x, y) => x + y,
    mul: (x, y) => x * y,
  };

  const $logger = console.log;

  // list of variable names and their values
  const varNames = Object.keys(variables);
  const varValues = Object.values(variables);

  // Function with all variables + globals as parameters
  const func = new Function(
    ...varNames, 
    '$math',
    '$logger',
    `"use strict";\n${code}\n//# sourceURL=executeCode.js`
  );

  // Call the function 
  func(...varValues, $math, $logger);
} 