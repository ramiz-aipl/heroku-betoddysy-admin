import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(public userService :UserService,
    private formBuilder: FormBuilder,
    private router: Router,) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  login(){
    console.log('login component')
    // if (this.userService.isLoggedIn) {
    //   this.router.navigate(['/'])
    // }
    
  }
  onSubmit() {
    this.loginForm.controls['email'].markAsTouched()
    this.loginForm.controls['password'].markAsTouched()
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value)
      // this.userService.login()
      console.log(this.loginForm.value,'this.loginForm.value')
    }
  }
}
