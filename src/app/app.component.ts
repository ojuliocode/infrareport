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

    this.getPosition()
      .then((pos) => {
        loader
          .load()
          .then(() => {
            new google.maps.Map(document.getElementById('map') as HTMLElement, {
              center: { lat: pos.lat, lng: pos.lng },
              zoom: 20,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        loader
          .load()
          .then(() => {
            new google.maps.Map(document.getElementById('map') as HTMLElement, {
              center: { lat: 10, lng: 6 },
              zoom: 15,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
