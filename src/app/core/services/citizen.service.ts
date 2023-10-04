import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  doc,
  docData,
} from '@angular/fire/firestore';
import { Observable, lastValueFrom, of } from 'rxjs';
import { Citizen } from 'src/app/shared/models/citizen.model';
import { first, switchMap } from 'rxjs/operators';
import {
  User,
  Auth,
  authState,
  AuthModule,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class CitizenService {
  citizen$: Observable<any>;
  user$: Observable<User>;
  firebaseCitizen;
  citizenId: string;
  citizen: Citizen;

  constructor(
    private afa: AngularFireAuth,
    private firestore: Firestore,
    private auth: Auth
  ) {
    this.citizen$ = authState(this.auth as any).pipe(
      switchMap((citizen) => {
        if (citizen) {
          this.firebaseCitizen = citizen;
          this.citizenId = citizen.uid;

          const doca = doc(
            this.firestore,
            `citizens/${citizen.uid}`
          ) as DocumentReference<Citizen>;
        }
        return of(null);
      })
    );
  }

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
