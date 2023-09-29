import { Component, OnInit } from '@angular/core';
import { SidebarItem } from '../../models/sidebar-item.model';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  sidebarItems: SidebarItem[] = [];
  sideBarCustomItem: SidebarItem = {
    label: 'Sair',
    icon: 'logout',
    height: '3.5em',
  };

  ngOnInit(): void {
    this.sidebarItems = [
      {
        label: 'Ocorrências',
        icon: 'home',
        height: '3.5em',
      },
      {
        label: 'Gráficos',
        icon: 'data_usage',
        height: '3.5em',
      },
      {
        label: 'Filtrar',
        icon: 'sort',
        height: '3.5em',
      },
    ];
  }
}
