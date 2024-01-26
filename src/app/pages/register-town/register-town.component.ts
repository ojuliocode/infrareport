import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Town } from 'src/app/shared/models/town.model';

@Component({
  selector: 'app-register-town',
  templateUrl: './register-town.component.html',
  styleUrls: ['./register-town.component.scss'],
})
export class RegisterTownComponent implements OnInit {
  createUserForm: UntypedFormGroup;
  town: Town = {
    email: '',
    password: '',
    displayName: '',
    type: 'town',
    zipCode: '',
  };
  type: any = 'town';
  townFormTypes = [
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
    this.createUserForm = this.fb.group({
      displayName: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
      cityZipCode: [''],
      type: [''],
    });
  }

  async saveUser() {
    this.fillForm();
    let id;
    id = this.authService.createUser(this.town, this.type).then((result) => {
      this.router.navigate(['/map']);
    });
    return id;
  }

  fillForm() {
    this.town.displayName = this.createUserForm.get('displayName')?.value;
    this.town.email = this.createUserForm.get('email')?.value;
    this.town.password = this.createUserForm.get('password')?.value;
    this.town.zipCode = this.createUserForm.get('cityZipCode')?.value;
  }

  onTypeChange(event: any) {
    this.type = event.value;
  }

  registerCitizen() {
    this.router.navigate(['/register-citizen']);
  }
  login() {
    this.router.navigate(['/login']);
  }
}
