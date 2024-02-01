import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notification: any = null;

  constructor(private notifierService: NotifierService) {}

  ngOnInit(): void {
    this.notifierService.getNotification().subscribe((notification) => {
      this.notification = notification;
    });
  }
}
