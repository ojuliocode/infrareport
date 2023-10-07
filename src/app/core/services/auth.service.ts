import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  DocumentReference,
  Firestore,
  doc,
  docData,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '@angular/fire/auth';
import { Town } from 'src/app/shared/models/town.model';
import { Citizen } from 'src/app/shared/models/citizen.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;
  firebaseUser: User;
  userId: string;
  loggedUser: Town | Citizen | undefined;
  type: string;

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private router: Router
  ) {
    this.user$ = authState(this.auth as any).pipe(
      switchMap((user) => {
        if (user) {
          this.firebaseUser = user;
          this.userId = user.uid;
          this.getUserById(this.userId).then((fetchedUser) => {
            this.loggedUser = fetchedUser as any;
          });

          const obs = getDoc(
            doc(this.firestore, `${this.type}_list/${this.userId}`)
          );

          return obs;
        } else this.loggedUser = undefined;
        return of(null);
      })
    );
  }

  async getUserById(id: any) {
    let user: any;
    await getDoc(doc(this.firestore, `citizen_list/${id}`)).then(
      async (citizen) => {
        if (!citizen.data()) {
          await getDoc(doc(this.firestore, `town_list/${id}`)).then((town) => {
            user = town.data() as any;
          });
        } else user = citizen.data() as any;
      }
    );
    this.type = user.type;
    return user;
  }

  /**
   * Creates a new user
   * @param user {User} User to be created
   * @returns {Promise}
   */
  async createUser(user: Citizen | Town, type: string): Promise<void> {
    createUserWithEmailAndPassword(this.auth, user.email, user.password)
      .then(async (e) => {
        const createdUser = await setDoc(
          doc(this.firestore, `${type}_list/${e.user.uid}`),
          user
        );
        return createdUser;
      })
      .catch(async (e) => {
        alert(
          'Não foi possível criar o usuário. Por favor, cheque se todos os campos estão preenchidos corretamente'
        );
      });
  }

  /**
   * Sign user in
   * @param email {string} User email
   * @param password {string} User passwrod
   */
  async signIn(email: string, password: string, type: string) {
    this.type = type;
    signInWithEmailAndPassword(this.auth, email, password)
      .then(async (info) => {
        this.router.navigate(['/map']);
      })
      .catch(async (err) => {
        console.log(err);
        alert(
          'Login não foi bem-sucedido. Por favor, cheque seu email e senha'
        );
      });
  }

  async signOut() {
    await signOut(this.auth).then((res) => {
      this.router.navigate(['/login']);
    });
  }
}
