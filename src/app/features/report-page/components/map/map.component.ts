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

            const svgMarker = {
              path: 'M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
              fillColor: 'blue',
              fillOpacity: 0.6,
              strokeWeight: 0,
              rotation: 0,
              scale: 2,
              anchor: new google.maps.Point(0, 20),
            };

            [-22, -23, -24, -25].map((element) => {
              const a = new google.maps.Marker({
                position: {
                  lat: element,
                  lng: element,
                },
                map: map,
                title: 'bogos',
                icon: svgMarker,
              });
              a.setMap(map);
            });
            new google.maps.Marker({});
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
