import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Citizen } from 'src/app/shared/models/citizen.model';

@Component({
  selector: 'app-register-citizen',
  templateUrl: './register-citizen.component.html',
  styleUrls: ['./register-citizen.component.scss'],
})
export class RegisterCitizenComponent implements OnInit {
  createUserForm: UntypedFormGroup;
  citizen: Citizen = {
    email: '',
    address: {
      addressLine1: '',
      city: '',
      addressLine2: '',
      cityZipCode: '',
      number: 0,
    },
    password: '',
    displayName: '',
    type: 'citizen',
  };
  type: any = 'citizen';
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
    this.createUserForm = this.fb.group({
      displayName: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
      addressLine1: [''],
      addressLine2: [''],
      cityZipCode: [''],
      city: [''],
      type: [''],
    });
  }

  async saveUser() {
    this.fillForm();
    let user;
    try {
      user = await this.authService.createUser(this.citizen, this.type);
      this.router.navigate(['/login']);
    } catch (err) {
      console.log(err);
    }
  }

  fillForm() {
    this.citizen.displayName = this.createUserForm.get('displayName')?.value;
    this.citizen.email = this.createUserForm.get('email')?.value;
    this.citizen.password = this.createUserForm.get('password')?.value;
    this.citizen.address.addressLine1 =
      this.createUserForm.get('addressLine1')?.value;
    this.citizen.address.addressLine2 =
      this.createUserForm.get('addressLine2')?.value;
    this.citizen.address.cityZipCode =
      this.createUserForm.get('cityZipCode')?.value;
    this.citizen.address.city = this.createUserForm.get('city')?.value;
  }

  onTypeChange(event: any) {
    this.type = event.value;
  }

  registerTown() {
    this.router.navigate(['/register-town']);
  }

  login() {
    this.router.navigate(['/login']);
  }
}
