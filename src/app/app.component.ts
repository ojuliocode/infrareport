import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_API_KEY } from 'src/environments/environment.prod';
import { CitizenService } from './core/services/citizen.service';
import { first } from 'rxjs';
import { Citizen } from './shared/models/citizen.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'infrareport';
  constructor(private citizenService: CitizenService) {}
  async ngOnInit() {
    this.citizenService.citizen$.pipe(first()).subscribe((citizen: Citizen) => {
      console.log('citizen no layout');
      console.log(citizen);
    });
  }
}
