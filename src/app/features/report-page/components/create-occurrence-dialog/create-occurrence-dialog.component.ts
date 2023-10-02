import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OCCURRENCE_TYPES } from 'src/app/shared/constants/occurrence.constants';

type Data = {
  location: {
    lat: number;
    lng: number;
  };
};
@Component({
  selector: 'app-create-occurrence-dialog',
  templateUrl: './create-occurrence-dialog.component.html',
  styleUrls: ['./create-occurrence-dialog.component.scss'],
})
export class CreateOccurrenceDialogComponent implements OnInit {
  createOcurrenceForm: any;
  occurrenceTypes = OCCURRENCE_TYPES;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.createOcurrenceForm = this.fb.group({
      type: [''],
      comment: [''],
      image: [''],
      createdBy: [''],
      createdAt: [''],
    }) as UntypedFormGroup;
  }
}
