import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { CustomValidationService } from '../services/custom-validation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  constructor(private fb: FormBuilder, private CustomValidator: CustomValidationService) { }

  userForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", [Validators.required, Validators.minLength(3)]],
    confirmPassword: ["", [Validators.required, Validators.minLength(3)]],
    address: this.fb.group({
      street: [""],
      city: [""],
      state: [""],
      zip: [""]
    }),
    daysAvailable: this.fb.array([this.fb.control("")])


  },
    {
      validator: this.CustomValidator.passwordMatchValidator("password", "confirmPassword")

    });

    addDay(){
      this.daysAvailable.push(this.fb.control(""))
    }
    removeRow(i: number): void {
      console.log(this.daysAvailable);
      this.daysAvailable.removeAt(i);}
    get daysAvailable(){
      return this.userForm.get("daysAvailable") as FormArray;
    }

    get username(){
      return this.userForm.get("username");
    }

    get confirmPassword(){
      return this.userForm.get("confirmPassword");
    }

     get password(){
      return this.userForm.get("password");
    }
  stateOptions: string[] = ["Mumbai", "Gujarat", "Chennai", "Lucknow", "Hyderabad", "Punjab"];
  userAddressInfo: any = {
    street: "1234 Main Street",
    city: "My City",
    state: this.stateOptions[0],
    zip: "12345"

  }
  ngOnInit() {


  }
  autofillAddress() {
    this.userForm.patchValue({
      address: {
        street: this.userAddressInfo.street,
        city: this.userAddressInfo.city,
        state: this.userAddressInfo.state,
        zip: this.userAddressInfo.zip

      }
    })
  }
  clear() {
    // this.username.setValue("");
    this.userForm.reset();

  }
  onSubmit() {
    console.log(this.userForm.value);

  }
}
