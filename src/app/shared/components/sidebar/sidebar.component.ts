import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SidebarItem } from '../../models/sidebar-item.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateOccurrenceDialogComponent } from 'src/app/features/report-page/components/create-occurrence-dialog/create-occurrence-dialog.component';

// TODO: preciso colocar condicional pra quando o user for cidadao ou prefeitura (botao de add)
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() panMap: EventEmitter<any> = new EventEmitter();

  data: any = { coords: {} };

  sidebarItems: SidebarItem[] = [];
  sidebarCitizenItems: SidebarItem[] = [];
  sidebarTownItems: SidebarItem[] = [];
  sideBarCustomItem: SidebarItem; //{
  //  label: 'Sair',
  //  icon: 'logout',
  //  height: '5em',
  //};
  sideBarActions: any = [];

  constructor(private authService: AuthService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.sideBarActions = [
      () => {
        navigator.geolocation.getCurrentPosition(
          (resp) => {
            this.panMap.emit({
              lng: resp.coords.longitude,
              lat: resp.coords.latitude,
            });
          },
          (err) => {
            console.log(err);
          }
        );
      },
      async () => {
        try {
          navigator.geolocation.getCurrentPosition(
            (resp) => {
              this.dialog.open(CreateOccurrenceDialogComponent, {
                panelClass: 'create-occurrence-dialog',
                data: {
                  location: {
                    lng: resp.coords.longitude,
                    lat: resp.coords.latitude,
                  },
                },
                enterAnimationDuration: '200ms',
                exitAnimationDuration: '200ms',
              });
            },
            (err) => {
              console.log(err);
            }
          );
        } catch (err) {
          console.log(err);
        }
      },
      () => {
        this.logout();
      },
    ];
    this.sidebarCitizenItems = [
      {
        label: 'Home',
        icon: 'home',
        height: '5em',
      },
      {
        label: 'Criar',
        icon: 'create',
        height: '5em',
      },
      {
        label: 'Sair',
        icon: 'logout',
        height: '5em',
      },
      //{
      //  label: 'Filtrar',
      //  icon: 'sort',
      //  height: '5em',
      //},
    ];
    this.sidebarTownItems = [
      {
        label: 'Home',
        icon: 'home',
        height: '5em',
      },
      {
        label: 'Gráficos',
        icon: 'data_usage',
        height: '5em',
      },
      {
        label: 'Sair',
        icon: 'logout',
        height: '5em',
      },
      //{
      //  label: 'Filtrar',
      //  icon: 'sort',
      //  height: '5em',
      //},
    ];
    this.sidebarItems =
      this.authService.loggedUser?.type == 'citizen'
        ? this.sidebarCitizenItems
        : this.sidebarTownItems;
  }

  async logout() {
    await this.authService.signOut();
  }
}
