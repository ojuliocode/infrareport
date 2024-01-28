import { Component, OnInit } from '@angular/core';
import { OccurrenceService } from 'src/app/core/services/occurrence.service';

@Component({
  selector: 'app-report-layout',
  templateUrl: './report-layout.component.html',
  styleUrls: ['./report-layout.component.scss'],
})
export class ReportLayoutComponent implements OnInit {
  constructor(private occurrenceService: OccurrenceService) {}
  ngOnInit(): void {}
}
