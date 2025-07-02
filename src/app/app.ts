import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { check, deepCopy, execute } from './utils/helpers';
import { CustomSort } from './pipes/sortpipe-pipe';
import { CommonModule } from '@angular/common';
import { Repeater } from './components/repeater/repeater';
import { PERSON, DATA, OPTION } from './constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Repeater, CustomSort],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  persons = PERSON;
  data = DATA;
  option = OPTION;

  ngOnInit() {
    //testing deepcopy
    const original = {
      name: 'Lalita',
      date: new Date(),
      greet: function () {
        console.log('Hello!');
      },
      nested: { city: 'Mannheim' },
      list: [1, 2, { inside: true }],
    };

    const copied = deepCopy(original);

    console.log(copied.nested.city);
    console.log(copied.date instanceof Date);
    copied.greet();

    //testing deep equivalence
    const data1 = { a: 17, b: { c: 'Test', d: undefined } };
    const data2 = { a: 17, b: { c: 'Test' } };
    const data3 = { a: 17, b: null };

    console.log(check(data1, data2));
    console.log(check(data1, data3));

    //execute
    execute('$logger("Sum:", $math.sum(a, b))', { a: 17, b: 3 });
    execute('$logger("Mul:", $math.mul(a, b))', { a: 17, b: 3 });
  }
}
