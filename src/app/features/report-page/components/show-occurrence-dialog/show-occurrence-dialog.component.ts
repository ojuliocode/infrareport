import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { OCCURRENCE_TYPES } from 'src/app/shared/constants/occurrence.constants';
import { Occurrence } from 'src/app/shared/models/occurrence.model';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';

@Component({
  selector: 'app-show-occurrence-dialog',
  templateUrl: './show-occurrence-dialog.component.html',
  styleUrls: ['./show-occurrence-dialog.component.scss'],
})
export class ShowOccurrenceDialogComponent implements OnInit {
  occurrenceTypes = OCCURRENCE_TYPES;
  createOcurrenceForm: UntypedFormGroup;
  public occurrence: Occurrence = this.data['occurrence'];
  public imgLoaded = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    public dialogRef: MatDialogRef<ShowOccurrenceDialogComponent>,
    private storage: Storage
  ) {}
  ngOnInit(): void {
    this.fetchImg();
  }

  fetchImg() {
    getDownloadURL(ref(this.storage, this.occurrence.id))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();

        // Or inserted into an <img> element
        const img = document.getElementById('myImg');
        img?.setAttribute('src', url);
      })
      .catch((error) => {
        console.log(error);
        // Handle any errors
      });
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
