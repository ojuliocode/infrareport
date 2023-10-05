import { Injectable } from '@angular/core';
import {
  Auth,
  User,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  DocumentReference,
  Firestore,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Citizen } from 'src/app/shared/models/citizen.model';

@Injectable({
  providedIn: 'root',
})
export class CitizenService {
  citizen$: Observable<any>;
  user$: Observable<User>;
  firebaseCitizen: User;
  citizenId: string;
  citizen: Citizen;

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private router: Router
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

  /**
   * Creates a new citizen
   * @param citizen {Citizen} Citizen to be created
   * @returns {Promise}
   */
  async createCitizen(citizen: Citizen): Promise<void> {
    createUserWithEmailAndPassword(this.auth, citizen.email, citizen.password)
      .then(async (e) => {
        const createdCitizen = await setDoc(
          doc(this.firestore, `citizens/${e.user.uid}`),
          citizen
        );
        return createdCitizen;
      })
      .catch(async (e) => {
        alert(
          'Não foi possível criar o usuário. Por favor, cheque se todos os campos estão preenchidos corretamente'
        );
      });
  }

  /**
   * Sign citizen in
   * @param email {string} Citizen email
   * @param password {string} Citizen passwrod
   */
  async signIn(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(async (info) => {
        console.log('Signing In');
        this.router.navigate(['/map']);
      })
      .catch(async (err) => {
        console.log(err);
        alert(
          'Login não foi bem-sucedido. Por favor, cheque seu email e senha'
        );
      });
  }
}
