import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { OCCURRENCE_TYPES } from 'src/app/shared/constants/occurrence.constants';
import { Occurrence } from 'src/app/shared/models/occurrence.model';

@Component({
  selector: 'app-show-occurrence-dialog',
  templateUrl: './show-occurrence-dialog.component.html',
  styleUrls: ['./show-occurrence-dialog.component.scss'],
})
export class ShowOccurrenceDialogComponent implements OnInit {
  occurrenceTypes = OCCURRENCE_TYPES;
  createOcurrenceForm: UntypedFormGroup;
  public occurrence: Occurrence = this.data['occurrence'];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    public dialogRef: MatDialogRef<ShowOccurrenceDialogComponent>
  ) {}
  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }
}
