import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userForm!: FormGroup;
  stateOptions: string[] = ["Mumbai", "Ahmedabad", "Chennai"];
  userAddressInfo: any = {
    street: "1234 Main Street",
    city: "My City",
    state: this.stateOptions[0],
    zip: "12345"

  }
  constructor() { }
  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl(""),
      password: new FormControl(""),
      confirmPassword: new FormControl(""),
      address: new FormGroup({
        street: new FormControl(""),
        city: new FormControl(""),
        state: new FormControl(""),
        zip: new FormControl(""),
      })

    });

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
onSubmit(){
  console.log(this.userForm.value);

}
}
