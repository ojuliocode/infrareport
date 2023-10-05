import { Injectable } from '@angular/core';
import {
  DocumentData,
  Firestore,
  addDoc,
  collection,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Occurrence } from 'src/app/shared/models/occurrence.model';

@Injectable({
  providedIn: 'root',
})
export class OccurrenceService {
  constructor(private firestore: Firestore) {}

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
