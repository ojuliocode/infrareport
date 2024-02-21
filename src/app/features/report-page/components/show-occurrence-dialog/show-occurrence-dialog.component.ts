import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { OCCURRENCE_TYPES } from 'src/app/shared/constants/occurrence.constants';
import { Occurrence } from 'src/app/shared/models/occurrence.model';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { OccurrenceService } from 'src/app/core/services/occurrence.service';
import { NotifierService } from 'src/app/core/services/notifier.service';

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
  public userType: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    public dialogRef: MatDialogRef<ShowOccurrenceDialogComponent>,
    private storage: Storage,
    private spinner: SpinnerService,
    private authService: AuthService,
    private occurrenceService: OccurrenceService,
    private notifier: NotifierService
  ) {}
  async ngOnInit() {
    this.userType = this.authService.type;
    this.spinner.show();
    await this.fetchImg()
      .then(() => {
        this.spinner.hide();
      })
      .catch(() => {
        this.spinner.hide();
      });
  }

  async fetchImg() {
    return new Promise(async (resolve, reject) => {
      await getDownloadURL(ref(this.storage, this.occurrence.id))
        .then(async (url) => {
          // This can be downloaded directly:
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.open('GET', url);
          xhr.send();

          xhr.onload = (event) => {
            const blob = xhr.response;
          };

          // Or inserted into an <img> element
          const img = document.getElementById('myImg');
          img?.setAttribute('src', url);

          if (img) {
            img.onload = () => resolve(true);
            img.onerror = () => reject();
          }
        })
        .catch((error) => {
          console.log(error);
          // Handle any errors
        });
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }

  async changeSolvedState(solved: boolean) {
    this.spinner.show();

    const occ = { ...this.data['occurrence'], solved: !solved };
    try {
      await this.occurrenceService.updateOccurrence(
        this.data['occurrence'].id,
        occ,
        this.authService.userId
      );
      this.notifier.notify(
        'Sucesso',
        'green',
        `Ocorrência ${solved ? 'reaberta' : 'resolvida'} com sucesso`
      );
      this.dialogRef.close();
    } catch (err) {
      this.notifier.notify('Aviso', 'salmon', 'Ocorreu um erro');
    } finally {
      this.spinner.hide();
    }
  }
}
