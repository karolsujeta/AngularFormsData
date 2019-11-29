import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  modelForm: FormGroup = null;

  newfirstname: String = '';
  newlastname: String = '';
  newzip: String = '';
  newemail: String = '';
  newsex: String = '';

  @Output()
  event = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.modelForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      zip: ['', [Validators.required, Validators.pattern('[0-9]{2}\-[0-9]{3}')]],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      sex: ['', Validators.required]
    });
  }

  onSubmit(form) {
    console.log(form.value);
  }

  addTodo() {
    var newElement = {
      firstname: this.newfirstname,
      lastname: this.newlastname,
      zip: this.newzip,
      email: this.newemail,
      sex: this.newsex
    }
    this.event.emit(newElement);
  }
}
