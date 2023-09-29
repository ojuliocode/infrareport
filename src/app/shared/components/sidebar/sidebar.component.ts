import { Component, OnInit } from '@angular/core';
import { SidebarItem } from '../../models/sidebar-item.model';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  sidebarItems: SidebarItem[] = [];
  ngOnInit(): void {
    this.sidebarItems = [
      {
        label: 'Home',
        icon: 'home',
        height: 20,
      },
      {
        label: 'Ocurrences',
        icon: 'data_usage',
        height: 20,
      },
    ];
  }
}
