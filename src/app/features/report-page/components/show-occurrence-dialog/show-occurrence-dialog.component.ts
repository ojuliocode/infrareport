import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@angular/router';

@Component({
  selector: 'app-show-occurrence-dialog',
  templateUrl: './show-occurrence-dialog.component.html',
  styleUrls: ['./show-occurrence-dialog.component.scss'],
})
export class ShowOccurrenceDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Data) {}

  ngOnInit(): void {}
}
