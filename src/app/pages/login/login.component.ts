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

  type: any;
  citizenFormTypes = [
    {
      value: 'citizen',
      displayName: 'Cidadão',
    },
    {
      value: 'town',
      displayName: 'Cidade',
    },
  ];
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
    if (this.type == 'citizen') {
      this.citizenService.signIn(this.email, this.password);
    }
  }

  /**
   * Fills the local variables with form values
   */
  private fillForm() {
    this.email = this.loginForm.get('email')?.value;
    this.password = this.loginForm.get('password')?.value;
  }
  onTypeChange(event: any) {
    this.type = event.value;
  }
}
