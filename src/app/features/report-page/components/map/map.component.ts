import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_API_KEY } from 'src/environments/environment.prod';
import { MatDialog } from '@angular/material/dialog';
import { CreateOccurrenceDialogComponent } from '../create-occurrence-dialog/create-occurrence-dialog.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { OccurrenceService } from 'src/app/core/services/occurrence.service';
import { Subject, takeUntil } from 'rxjs';
import { Occurrence } from 'src/app/shared/models/occurrence.model';
import { ShowOccurrenceDialogComponent } from '../show-occurrence-dialog/show-occurrence-dialog.component';
import { NotifierService } from 'src/app/core/services/notifier.service';

// TODO: se usuario for cidadao, zoom e latitude inicial vao ser X. Caso cidade, vai ser Y
// TODO: se a ocorrencia for varias vezes a mesma, ver como da pra agrupar na hora de resolver
// TODO: preciso limitar quais ocorrencias vao ser mostradas para o usuário ou pra cidade
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
  title = 'infrareport';
  mapLoaded: boolean = false;
  positionToRender = { lat: 0, lng: 0 };
  occurrences: Occurrence[] = [];
  markers: google.maps.Marker[] = [];
  private destroy$ = new Subject<void>();
  private firstSubscribe = true;
  public map: any;
  @Input() data: any;
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private occurrenceService: OccurrenceService,
    private elementRef: ElementRef,
    private notifier: NotifierService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      (this.map as google.maps.Map).panTo(changes['data']?.currentValue);
      setTimeout(() => (this.map as google.maps.Map).setZoom(16), 500);
    }
  }
  ngOnDestroy(): void {}
  async ngAfterViewInit() {
    await this.occurrenceService.init();
    this.occurrenceService.occurrences$
      .pipe(takeUntil(this.destroy$), takeUntil(this.authService.logout$))
      .subscribe((occurrence) => {
        if (!this.firstSubscribe) {
          occurrence.forEach((oc) => {
            if (occurrence.length <= 0) this.occurrences = [];
            else this.occurrences.push(oc);
          });
          if (this.mapLoaded) this.loadMarkers();
        }
        this.firstSubscribe = false;
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
        this.notifier.notify(
          'Aviso',
          'salmon',
          'A localidade não foi fornecida'
        );
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
                disableDefaultUI: true,
                clickableIcons: false,
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
          })
          .catch((err) => {
            console.log(err);
          });
        this.mapLoaded = true;
      });
  }
}
