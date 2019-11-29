import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators';

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

    this.modelForm.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.onControlValueChanged();
    });

    this.onControlValueChanged(); // ustawiamy początkowany stan walidacji

  }

  formErrors = {
    firstname: '',
    lastname: '',
    zip: '',
    email: '',
    sex: '',
  }

  private validationMessages = {
    firstname: {
      required: 'Nie wprowadzono imienia!',
      minlength: 'Wprowadzono za mało znaków! (minimum 2)',
      maxlength: 'Wprowadzono zbyt dużo znaków! (maximum 15)'
    },
    lastname: {
      required: 'Nie wprowadzono nazwiska!',
      minlength: 'Wprowadzono zbyt mało znaków! (minimum 2)',
      maxlength: 'Wprowadzono zbyt dużo znaków! (maximum 25)'
    },
    zip: {
      required: 'Nie wprowadzono kodu pocztowego!',
      pattern: 'Wprowadzono zły format!'

    },
    email: {
      required: 'Nie wprowadzono adresu email!',
      pattern: 'Wprowadzono zły format!'
    }
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

  onControlValueChanged() {
    const form = this.modelForm;

    for (let field in this.formErrors) {
      this.formErrors[field] = '';
      let control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const validationMessages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += validationMessages[key] + ' ';
        }
      }
    }
  }
}
