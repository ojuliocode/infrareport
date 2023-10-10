import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_API_KEY } from 'src/environments/environment.prod';
import { CitizenService } from './core/services/citizen.service';
import { first } from 'rxjs';
import { Citizen } from './shared/models/citizen.model';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'infrareport';
  constructor(private authService: AuthService) {}
  async ngOnInit() {
    this.authService.user$.pipe(first()).subscribe((citizen: Citizen) => {
      console.log('App Pipe');
    });
  }
}
