import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { CitizenService } from 'src/app/core/services/citizen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  email: string;
  password: string;

  constructor(
    private fb: UntypedFormBuilder,
    private citizenService: CitizenService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  login() {
    this.fillForm();
    this.citizenService.signIn(this.email, this.password);
  }

  fillForm() {
    this.email = this.loginForm.get('email').value;
    this.password = this.loginForm.get('password').value;
  }
}
