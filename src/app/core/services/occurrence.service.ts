import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
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
  async createOccurence(occurrence: Occurrence, townId: string): Promise<void> {
    const createdOccurence = await setDoc(
      doc(this.firestore, `townList/${townId}/occurrences`),
      occurrence
    );
    return createdOccurence;
  }
}
