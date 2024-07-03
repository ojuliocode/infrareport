import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
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
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  login() {
    alert("Pagina temporariamente desativada");
    /*
    this.fillForm();
    this.authService.signIn(this.email, this.password);
    */
  }

  /**
   * Fills the local variables with form values
   */
  private fillForm() {
    /*
    this.email = this.loginForm.get('email')?.value;
    this.password = this.loginForm.get('password')?.value;
    */
  }

  register(type: string) {
    alert("Pagina temporariamente desativada");
    /*
    this.router.navigate([`/register-${type}`]);
    */
  }
}
