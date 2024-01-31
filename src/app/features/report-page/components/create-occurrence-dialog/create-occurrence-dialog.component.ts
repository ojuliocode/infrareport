import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { CitizenService } from 'src/app/core/services/citizen.service';
import { OccurrenceService } from 'src/app/core/services/occurrence.service';
import { TownService } from 'src/app/core/services/town.service';
import { OCCURRENCE_TYPES } from 'src/app/shared/constants/occurrence.constants';
import { Citizen } from 'src/app/shared/models/citizen.model';
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
  townId = '';
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

  img: File;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private townService: TownService,
    private occurrenceService: OccurrenceService,
    public dialogRef: MatDialogRef<CreateOccurrenceDialogComponent>
  ) {}

  ngOnInit(): void {
    this.createOcurrenceForm = this.fb.group({
      comment: [''],
      image: [''],
      createdAt: [''],
    }) as UntypedFormGroup;

    const loggedUser = this.authService.loggedUser as Citizen;

    this.townService
      .getTownByZipCode(loggedUser.address.cityZipCode)
      .then((res) => {
        if (res) this.townId = res;
      });
  }

  saveOccurrence() {
    try {
      if (!this.townId)
        throw 'A sua cidade ainda não se cadastrou no Infrareport. ';
      this.fillForm();
      this.occurrenceService
        .createOccurence(this.occurrence, this.townId, this.img)
        .then(() => {
          alert('Ocorrência criada com sucesso');
        })
        .catch((eer) => {
          alert('Houve um erro ao criar a ocorrência');
        });
    } catch (err) {
      alert(err ? err : 'Houve um erro ao criar a ocorrência');
    } finally {
      this.dialogRef.close();
    }
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
  }

  fileHandler(e: any) {
    this.img = e.target.files[0];
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
