import { Injectable } from '@angular/core';
import {
  Firestore,
  Query,
  collection,
  collectionData,
  doc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { first, lastValueFrom, map, zip } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TownService {
  constructor(private firestore: Firestore) {}

  async getTownByZipCode(zipCode: string) {
    const ref = collection(this.firestore, 'town_list');
    const q = query(ref, where('zipCode', '==', zipCode));
    const refq = await getDocs(q);
    let res;
    refq.forEach((doc) => {
      res = doc.id;
    });
    return res;
  }
}
