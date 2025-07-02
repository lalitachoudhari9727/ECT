import { CustomSort } from './sortpipe-pipe';

describe('Custom Sort Pipe', () => {
  let pipe: CustomSort;
  beforeEach(() => {
    pipe = new CustomSort();
  });

  it('should sort array of primitives (numbers) ascending', () => {
    const input = [5, 3, 8, 1];
    const result = pipe.transform(input, '');
    expect(result).toEqual([1, 3, 5, 8]);
  });

  it('should sort array of objects by single property ascending', () => {
    const input = [{ name: 'Lalita' }, { name: 'Bobby' }, { name: 'Anurag' }];
    const result = pipe.transform(input, 'name');
    expect(result).toEqual([
      { name: 'Anurag' },
      { name: 'Bobby' },
      { name: 'Lalita' },
    ]);
  });

  it('should sort array of objects by single property descending', () => {
    const input = [{ name: 'Lalita' }, { name: 'Bobby' }, { name: 'Anurag' }];
    const result = pipe.transform(input, '-name');
    expect(result).toEqual([
      { name: 'Lalita' },
      { name: 'Bobby' },
      { name: 'Anurag' },
    ]);
  });

  it('should sort by multiple criteria', () => {
    const input = [
      { name: 'Bobby', price: 20 },
      { name: 'Anurag', price: 30 },
      { name: 'Bobby', price: 10 },
    ];
    const result = pipe.transform(input, ['name', '-price']);
    expect(result).toEqual([
      { name: 'Anurag', price: 30 },
      { name: 'Bobby', price: 20 },
      { name: 'Bobby', price: 10 },
    ]);
  });

  it('should handle nested properties', () => {
    const input = [
      { user: { age: 25 } },
      { user: { age: 20 } },
      { user: { age: 30 } },
    ];
    const result = pipe.transform(input, 'user.age');
    expect(result).toEqual([
      { user: { age: 20 } },
      { user: { age: 25 } },
      { user: { age: 30 } },
    ]);
  });

  it('should sort by date', () => {
    const input = [
      { created: new Date('2023-01-01') },
      { created: new Date('2022-01-01') },
    ];
    const result = pipe.transform(input, 'created');
    expect(result).toEqual([
      { created: new Date('2022-01-01') },
      { created: new Date('2023-01-01') },
    ]);
  });

  it('should sort null and undefined as equal', () => {
    const input = [{ val: null }, { val: undefined }, { val: 1 }];
    const result = pipe.transform(input, 'val');
    expect(result).toEqual([{ val: null }, { val: undefined }, { val: 1 }]);
  });
});
