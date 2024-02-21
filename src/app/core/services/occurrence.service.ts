import { Injectable } from '@angular/core';
import {
  DocumentData,
  Firestore,
  Query,
  addDoc,
  collection,
  collectionData,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Occurrence } from 'src/app/shared/models/occurrence.model';
import { AuthService } from './auth.service';
import { BehaviorSubject, takeUntil, tap } from 'rxjs';
import { TownService } from './town.service';
import { Citizen } from 'src/app/shared/models/citizen.model';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
@Injectable({
  providedIn: 'root',
})
export class OccurrenceService {
  private townId: string | undefined = '';
  public occurrences$ = new BehaviorSubject<Occurrence[]>([]);
  public unsub: any;
  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private townService: TownService,
    public storage: Storage
  ) {
    this.townId = this.authService.userId;
  }

  async init(): Promise<void> {
    try {
      if (this.authService.loggedUser?.type == 'citizen') {
        this.townService
          .getTownByZipCode(
            (this.authService.loggedUser as Citizen).address?.cityZipCode
          )
          .then((result) => {
            if (result) {
              this.townId = result;
              const appRef = collection(
                this.firestore,
                `town_list/${this.townId}/occurrences`
              );

              const appQuery = query(appRef);

              this.unsub = onSnapshot(
                collection(
                  this.firestore,
                  `town_list/${this.townId}/occurrences`
                ),
                (cc) => {
                  const plural: Occurrence[] = [];
                  cc.docChanges().forEach((occurence, index) => {
                    const occ: any = occurence.doc.data();
                    occ.id = occurence.doc.id;
                    plural.push(occ as Occurrence);
                  });
                  if (cc.docs.length <= 0) this.occurrences$.next([]);
                  this.occurrences$.next(plural);
                }
              );
            } else {
              alert('Sua cidade ainda não está cadastrada');
            }
          });
      } else {
        this.townId = this.authService.userId;
        const appRef = collection(
          this.firestore,
          `town_list/${this.townId}/occurrences`
        );

        const appQuery = query(appRef);

        this.unsub = onSnapshot(
          collection(this.firestore, `town_list/${this.townId}/occurrences`),
          (cc) => {
            const plural: Occurrence[] = [];
            cc.docChanges().forEach((occurence, index) => {
              const occ: any = occurence.doc.data();
              occ.id = occurence.doc.id;
              plural.push(occ as Occurrence);
            });
            this.occurrences$.next(plural);
            if (cc.docs.length <= 0) this.occurrences$.next([]);
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
    townId: string,
    img?: File
  ): Promise<DocumentData> {
    const createdOccurence = await addDoc(
      collection(this.firestore, `town_list/${townId}/occurrences`),
      occurrence
    );

    if (img) await this.saveImg(img, createdOccurence.id);

    return createdOccurence;
  }

  /**
   * Updates an existing occurrence
   * @param occurrenceId {string} ID of the occurrence to be updated
   * @param occurrence {Occurrence} Updated occurrence data
   * @param townId {string} ID of the town where the occurrence is located
   * @param img {File} Optional image to update
   * @returns {Promise}
   */
  async updateOccurrence(
    occurrenceId: string,
    occurrence: Partial<Occurrence>,
    townId: string,
    img?: File
  ): Promise<DocumentData> {
    const updatedOccurrenceRef = doc(
      this.firestore,
      `town_list/${townId}/occurrences`,
      occurrenceId
    );

    // Update the occurrence data
    await updateDoc(updatedOccurrenceRef, occurrence);

    // If an image is provided, update it as well
    if (img) await this.saveImg(img, occurrenceId);

    // Return the updated occurrence
    return getDoc(updatedOccurrenceRef);
  }

  async saveImg(img: any, id: any) {
    const storageRef = ref(this.storage, id);
    const uploadTask = await uploadBytesResumable(storageRef, img).on(
      'state_changed',
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
      },
      () => {
        console.log('finished');
      }
    );
  }
}
