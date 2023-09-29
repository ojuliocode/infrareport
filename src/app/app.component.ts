import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_API_KEY } from 'src/environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'infrareport';

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
    });

    loader.load().then(() => {
      new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 51, lng: 6 },
        zoom: 15,
      });
    });
  }
}
