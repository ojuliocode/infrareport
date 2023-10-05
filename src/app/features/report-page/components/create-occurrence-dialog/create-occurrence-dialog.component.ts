import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CitizenService } from 'src/app/core/services/citizen.service';
import { OCCURRENCE_TYPES } from 'src/app/shared/constants/occurrence.constants';
import { Occurrence } from 'src/app/shared/models/occurrence.model';

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
  createOcurrenceForm: UntypedFormGroup;
  occurrenceTypes = OCCURRENCE_TYPES;
  occurrence: Occurrence = {
    id: '',
    createdBy: '',
    type: '',
    comment: '',
    creationDate: '',
    location: {
      lat: 0,
      lng: 0,
    },
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private fb: UntypedFormBuilder,
    private citizenService: CitizenService
  ) {}

  ngOnInit(): void {
    this.createOcurrenceForm = this.fb.group({
      comment: [''],
      image: [''],
      createdAt: [''],
    }) as UntypedFormGroup;
  }

  onOccurenceTypeChanged(event: any) {
    this.occurrence.type = event.value;
  }

  fillForm() {
    this.occurrence.comment = this.createOcurrenceForm.get('comment')?.value;
    this.occurrence.location = {
      lat: this.data.location.lat,
      lng: this.data.location.lng,
    };
    const citizenId = this.citizenService.firebaseCitizen?.uid;
    this.occurrence.createdBy = citizenId;
  }
}
