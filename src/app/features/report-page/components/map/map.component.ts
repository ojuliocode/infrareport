import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_API_KEY } from 'src/environments/environment.prod';
import { MatDialog } from '@angular/material/dialog';
import { CreateOccurrenceDialogComponent } from '../create-occurrence-dialog/create-occurrence-dialog.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { OccurrenceService } from 'src/app/core/services/occurrence.service';
import { Subject, takeUntil } from 'rxjs';
import { Occurrence } from 'src/app/shared/models/occurrence.model';
import { ShowOccurrenceDialogComponent } from '../show-occurrence-dialog/show-occurrence-dialog.component';

// TODO: se usuario for cidadao, zoom e latitude inicial vao ser X. Caso cidade, vai ser Y
// TODO: se a ocorrencia for varias vezes a mesma, ver como da pra agrupar na hora de resolver
// TODO: preciso limitar quais ocorrencias vao ser mostradas para o usuário ou pra cidade
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  title = 'infrareport';
  mapLoaded: boolean = false;
  positionToRender = { lat: 0, lng: 0 };
  occurrences: Occurrence[] = [];
  private destroy$ = new Subject<void>();
  public map: any;
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private occurrenceService: OccurrenceService,
    private elementRef: ElementRef
  ) {}

  ngAfterViewInit(): void {
    this.occurrenceService.occurrences$
      .pipe(takeUntil(this.destroy$))
      .subscribe((occurrence) => {
        occurrence.forEach((oc) => {
          this.occurrences.push(oc);
        });
        if (this.mapLoaded) this.loadMarkers();
      });

    this.loadMap(this.elementRef.nativeElement);
  }
  ngOnInit(): void {}

  loadMarkers() {
    this.occurrences.map((occurrence) => {
      const a = new google.maps.Marker({
        position: {
          lat: occurrence.location.lat,
          lng: occurrence.location.lng,
        },
        map: this.map,
        title: 'bogos',
      });

      a.setMap(this.map);
      a.addListener('click', (mapsMouseEvent: any) => {
        this.dialog.open(ShowOccurrenceDialogComponent, {
          panelClass: 'show-occurrence-dialog',
          data: {
            occurrence: occurrence,
          },
          enterAnimationDuration: '200ms',
          exitAnimationDuration: '200ms',
        });
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

  loadMap(element: HTMLElement) {
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
            this.map = new google.maps.Map(
              element.querySelector('#map') as HTMLElement,
              {
                center: {
                  lat: this.positionToRender.lat,
                  lng: this.positionToRender.lng,
                },
                zoom: 15,
              }
            );

            this.map.addListener('click', (mapsMouseEvent: any) => {
              const location = mapsMouseEvent.latLng.toJSON();

              this.dialog.open(CreateOccurrenceDialogComponent, {
                panelClass: 'create-occurrence-dialog',
                data: {
                  location: location,
                },
                enterAnimationDuration: '200ms',
                exitAnimationDuration: '200ms',
              });
            });

            this.occurrences.map((occurrence) => {
              const a = new google.maps.Marker({
                position: {
                  lat: occurrence.location.lat,
                  lng: occurrence.location.lng,
                },
                map: this.map,
                title: 'bogos',
              });
              a.setMap(this.map);
            });
          })
          .catch((err) => {
            console.log(err);
          });
        this.mapLoaded = true;
      });
  }
}
