import { Component, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'app-forms-data';

  todosList = [{
    firstname: 'Edek',
    lastname: 'Zgredek',
    zip: '16-100',
    email: 'edekzgredek@gmail.com',
    sex: 'mężczyzna'
  }];

  addTodos(e) {
    this.todosList.push(e)
  }
}
