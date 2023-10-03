import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Citizen } from 'src/app/shared/models/citizen.model';

@Injectable({
  providedIn: 'root',
})
export class CitizenService {
  constructor(private afa: AngularFireAuth, private firestore: Firestore) {}

  async createCitizen(citizen: Citizen) {
    this.afa
      .createUserWithEmailAndPassword(citizen.email, citizen.password)
      .then(async (e) => {
        const createdCitizen = await addDoc(
          collection(this.firestore, 'citizens'),
          citizen
        );
        return createdCitizen;
      });
  }
}
