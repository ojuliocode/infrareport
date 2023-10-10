import { Injectable } from '@angular/core';
import {
  DocumentData,
  Firestore,
  Query,
  addDoc,
  collection,
  collectionData,
  doc,
  onSnapshot,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { Occurrence } from 'src/app/shared/models/occurrence.model';
import { AuthService } from './auth.service';
import { BehaviorSubject, takeUntil, tap } from 'rxjs';
import { TownService } from './town.service';
import { Citizen } from 'src/app/shared/models/citizen.model';

@Injectable({
  providedIn: 'root',
})
export class OccurrenceService {
  private townId: string | undefined = '';
  private loggedUser;
  public occurrences$ = new BehaviorSubject<Occurrence[]>([]);

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private townService: TownService
  ) {
    this.townId = this.authService.userId;
    this.loggedUser = this.authService.loggedUser;
  }

  async init(): Promise<void> {
    try {
      if (this.loggedUser?.type == 'citizen') {
        this.townService
          .getTownByZipCode((this.loggedUser as Citizen).address?.cityZipCode)
          .then((result) => {
            if (result) {
              this.townId = result;
              const appRef = collection(
                this.firestore,
                `town_list/${this.townId}/occurrences`
              );

              const appQuery = query(appRef);

              onSnapshot(
                collection(
                  this.firestore,
                  `town_list/${this.townId}/occurrences`
                ),
                (cc) => {
                  const plural: Occurrence[] = [];
                  cc.docChanges().forEach((occurence) => {
                    plural.push(occurence.doc.data() as Occurrence);
                  });
                  this.occurrences$.next(plural);
                }
              );
            } else {
              alert('Sua cidade ainda não está cadastrada');
            }
          });
      } else {
        const appRef = collection(
          this.firestore,
          `town_list/${this.townId}/occurrences`
        );

        const appQuery = query(appRef);

        onSnapshot(
          collection(this.firestore, `town_list/${this.townId}/occurrences`),
          (cc) => {
            const plural: Occurrence[] = [];
            cc.docChanges().forEach((occurence) => {
              plural.push(occurence.doc.data() as Occurrence);
            });
            this.occurrences$.next(plural);
          }
        );
      }
    } finally {
    }
  }
  /**
   * Creates a new occurrence
   * @param occurrence {Occurence} Occurence to be created
   * @returns {Promise}
   */
  async createOccurence(
    occurrence: Occurrence,
    townId: string
  ): Promise<DocumentData> {
    const createdOccurence = await addDoc(
      collection(this.firestore, `town_list/${townId}/occurrences`),
      occurrence
    );

    return createdOccurence;
  }
}
