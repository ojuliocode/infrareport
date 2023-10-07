import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_API_KEY } from 'src/environments/environment.prod';
import { MatDialog } from '@angular/material/dialog';
import { CreateOccurrenceDialogComponent } from '../create-occurrence-dialog/create-occurrence-dialog.component';
import { AuthService } from 'src/app/core/services/auth.service';

// TODO: se usuario for cidadao, zoom e latitude inicial vao ser X. Caso cidade, vai ser Y
// TODO: se a ocorrencia for varias vezes a mesma, ver como da pra agrupar na hora de resolver
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  title = 'infrareport';
  mapLoaded: boolean = false;
  positionToRender = { lat: 0, lng: 0 };

  constructor(private dialog: MatDialog, private authService: AuthService) {}
  ngOnInit(): void {
    let loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
    });

    this.getPosition()
      .then((pos) => {
        this.positionToRender = {
          lat: pos.lat,
          lng: pos.lng,
        };
      })
      .catch((err) => {
        this.positionToRender = {
          lat: 10,
          lng: 6,
        };
        alert('Localidade não foi fornecida');
      })
      .finally(() => {
        loader
          .load()
          .then(() => {
            console.log(this.authService.loggedUser);
            const map = new google.maps.Map(
              document.getElementById('map') as HTMLElement,
              {
                center: {
                  lat: this.positionToRender.lat,
                  lng: this.positionToRender.lng,
                },
                zoom: 15,
              }
            );

            map.addListener('click', (mapsMouseEvent: any) => {
              const location = mapsMouseEvent.latLng.toJSON();

              this.dialog.open(CreateOccurrenceDialogComponent, {
                panelClass: 'create-occurrence-dialog',
                data: {
                  location: location,
                },
              });
            });
          })
          .catch((err) => {
            console.log(err);
          });
        this.mapLoaded = true;
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
