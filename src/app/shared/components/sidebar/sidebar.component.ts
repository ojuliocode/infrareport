import { Component, OnInit } from '@angular/core';
import { SidebarItem } from '../../models/sidebar-item.model';
import { AuthService } from 'src/app/core/services/auth.service';

// TODO: preciso colocar condicional pra quando o user for cidadao ou prefeitura (botao de add)
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  sidebarItems: SidebarItem[] = [];
  sidebarCitizenItems: SidebarItem[] = [];
  sidebarTownItems: SidebarItem[] = [];
  sideBarCustomItem: SidebarItem = {
    label: 'Sair',
    icon: 'logout',
    height: '5em',
  };

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
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
        label: 'Filtrar',
        icon: 'sort',
        height: '5em',
      },
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
        label: 'Filtrar',
        icon: 'sort',
        height: '5em',
      },
    ];
    this.sidebarItems =
      this.authService.loggedUser?.type == 'citizen'
        ? this.sidebarCitizenItems
        : this.sidebarTownItems;
  }

  logout() {
    this.authService.signOut();
  }
}
