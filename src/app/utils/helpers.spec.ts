import { deepCopy, execute, check} from './helpers';

describe('deepCopy function', () => {
  it('should return same primitive value', () => {
    expect(deepCopy(42)).toBe(42);
    expect(deepCopy('hello')).toBe('hello');
    expect(deepCopy(null)).toBeNull();
    expect(deepCopy(undefined)).toBeUndefined();
    expect(deepCopy(true)).toBe(true);
  });

  it('should return a deep copy of a plain object', () => {
    const obj = { a: 1, b: { c: 2 } };
    const copy = deepCopy(obj);

    expect(copy).toEqual(obj);
    expect(copy).not.toBe(obj);
    expect(copy.b).not.toBe(obj.b);
  });

  it('should return a deep copy of an array', () => {
    const arr = [1, { a: 2 }, [3, 4]];
    const copy = deepCopy(arr);

    expect(copy).toEqual(arr);
    expect(copy).not.toBe(arr);
    expect(copy[1]).not.toBe(arr[1]);
    expect(copy[2]).not.toBe(arr[2]);
  });

  it('should handle Date objects', () => {
    const date = new Date();
    const copy = deepCopy(date);

    expect(copy).toEqual(date);
    expect(copy).not.toBe(date);
    expect(copy instanceof Date).toBeTrue();
  });

  it('should copy functions as references', () => {
    const fn = () => 5;
    const obj = { fn };
    const copy = deepCopy(obj);

    expect(copy.fn).toBe(fn);
  });

  it('should handle circular references', () => {
    const obj: any = { a: 1 };
    obj.self = obj;

    const copy = deepCopy(obj);
    expect(copy.a).toBe(1);
    expect(copy.self).toBe(copy);
  });

});



describe('check function', () => {
  it('should deeply compare objects with null/undefined values', () => {
    const obj1 = { a: 1, b: null };
    const obj2 = { a: 1 };
    const obj3 = { a: 1, b: undefined };

    expect(check(obj1, obj2)).toBeTrue();
    expect(check(obj1, obj3)).toBeTrue();
    expect(check(obj2, obj3)).toBeTrue();
  });

  it('should compare primitive types correctly', () => {
    expect(check(5, 5)).toBeTrue();
    expect(check('hello', 'hello')).toBeTrue();
    expect(check(true, true)).toBeTrue();
    expect(check(5, '5')).toBeFalse();
    expect(check(0, false)).toBeFalse();
  });

  it('should compare dates correctly', () => {
    const a = new Date('2025-07-02');
    const b = new Date('2025-07-02');
    const c = new Date('2021-01-01');

    expect(check(a, b)).toBeTrue();
    expect(check(a, c)).toBeFalse();
  });

  it('should compare arrays deeply', () => {
    expect(check([1, 2, 3], [1, 2, 3])).toBeTrue();
    expect(check([1, 2, 3], [1, 2])).toBeFalse();
    expect(check([1, [2]], [1, [2]])).toBeTrue();
    expect(check([1, [2]], [1, [3]])).toBeFalse();
  });

  it('should return false if one is array and one is object', () => {
    expect(check([1, 2], { 0: 1, 1: 2 })).toBeFalse();
  });

  

  it('should deeply compare nested objects', () => {
    const a = { x: 1, y: { z: 2 } };
    const b = { x: 1, y: { z: 2 } };
    const c = { x: 1, y: { z: 3 } };

    expect(check(a, b)).toBeTrue();
    expect(check(a, c)).toBeFalse();
  });

  it('should compare objects with different keys as not equal', () => {
    const a = { a: 1, b: 2 };
    const b = { a: 1 };

    expect(check(a, b)).toBeFalse();
  });

});


describe('execute function', () => {
  let consoleSpy: jasmine.Spy;

  beforeEach(() => {
    consoleSpy = spyOn(console, 'log').and.callFake(() => {});
  });

  it('should execute code with user-defined variables', () => {
    const code = 'console.log(a + b)';
    const variables = { a: 3, b: 7 };
    execute(code, variables);
    expect(consoleSpy).toHaveBeenCalledWith(10);
  });

  it('should use $math.sum to calculate sum', () => {
    const code = 'console.log($math.sum(x, y))';
    const variables = { x: 4, y: 5 };
    execute(code, variables);
    expect(consoleSpy).toHaveBeenCalledWith(9);
  });

  it('should use $math.mul to calculate product', () => {
    const code = 'console.log($math.mul(6, 7))';
    execute(code);
    expect(consoleSpy).toHaveBeenCalledWith(42);
  });

  it('should execute multiline user code', () => {
    const code = `
      const result = $math.mul(a, b);
      console.log(result);
    `;
    const variables = { a: 2, b: 3 };
    execute(code, variables);
    expect(consoleSpy).toHaveBeenCalledWith(6);
  });


  it('should throw an error for invalid code', () => {
    const code = 'throw new Error("Test Error")';
    expect(() => execute(code)).toThrowError('Test Error');
  });

});