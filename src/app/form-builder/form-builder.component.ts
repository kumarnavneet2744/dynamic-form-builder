import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../form.service';
interface Field {
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent {

  fields: Field[] = [];
  form!: FormGroup;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private formService: FormService) {
    this.form = this.fb.group({});
  }

  addField(type: string) {
    const newField: Field = {
      type,
      label: `Field ${this.fields.length + 1}`,
      placeholder: '',
      required: false,
    };
    this.fields.push(newField);
    this.createFormControl(newField);
  }

  createFormControl(field: Field) {
    const validators = field.required ? [Validators.required] : [];
    this.form.addControl(field.label, this.fb.control('', validators));
  }

  removeField(index: number) {
    this.fields.splice(index, 1);
    this.form.removeControl(`Field ${index + 1}`);
  }

  submitForm() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.successMessage = 'Form submitted successfully!';
      this.form.reset();
      this.fields = [];
    } else {
      this.successMessage = 'Please fill out the required fields.';
    }
  }
}
