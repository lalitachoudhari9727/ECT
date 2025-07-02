import { Name, Person } from './interfaces';

export const DATA: Name[] = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];
export const INFO = {
  name: 'Lalita',
  date: new Date(),
  greet: function () {
    console.log('Hello!');
  },
  nested: { city: 'Mannheim' },
  list: [1, 2, { inside: true }],
};

export const TEST1 = { a: 17, b: { c: 'Test', d: undefined } };
export const TEST2 = { a: 17, b: { c: 'Test' } };
export const TEST3 = { a: 17, b: null };
export const PERSON: Person[] = [
  {
    name: 'Lalita',
    price: 100,
    purchased: 'candy',
    address: { city: 'Nagpur' },
  },
  {
    name: 'Anurag',
    price: 500,
    purchased: 'Teddy Bear',
    address: { city: 'Shegaon' },
  },
  {
    name: 'Anurag',
    price: 400,
    purchased: 'Teddy Bear',
    address: { city: 'Shegaon' },
  },
  {
    name: 'Babita',
    price: 300,
    purchased: 'Pen',
    address: { city: 'Amravati' },
  },
  {
    name: 'Babita',
    price: 200,
    purchased: 'Pen',
    address: { city: 'Amravati' },
  },
];

export const OPTION: Person[] = [
  {
    name: 'Lalita',
    price: 200,
    purchased: 'candy',
    address: { city: 'Nagpur' },
  },
  {
    name: 'Anurag',
    price: 100,
    purchased: 'Teddy Bear',
    address: { city: 'Shegaon' },
  },
  {
    name: 'Babita',
    price: 300,
    purchased: 'Pen',
    address: { city: 'Amravati' },
  },
];
