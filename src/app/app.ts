import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { check, deepCopy, execute } from './utils/helpers';
import { CustomSort } from './pipes/sortpipe-pipe';
import { CommonModule } from '@angular/common';
import { Repeater } from './components/repeater/repeater';
import { PERSON, DATA, OPTION, INFO, TEST1, TEST2, TEST3 } from './constants';

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

    const copied = deepCopy(INFO);
    console.log(copied.nested.city);
    console.log(copied.date instanceof Date);
    copied.greet();

    //testing deep equivalence

    console.log(check(TEST1, TEST2));
    console.log(check(TEST1, TEST3));

    //execute
    execute('$logger("Sum:", $math.sum(a, b))', { a: 17, b: 3 });
    execute('$logger("Mul:", $math.mul(a, b))', { a: 17, b: 3 });
  }
}
