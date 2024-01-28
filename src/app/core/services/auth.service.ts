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
import { Observable, Subject, of } from 'rxjs';
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
  public logout$ = new Subject<void>();

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private router: Router
  ) {
    this.user$ = authState(this.auth as any).pipe(
      switchMap(async (user) => {
        if (user) {
          this.firebaseUser = user;
          this.userId = user.uid;
          await this.getUserById(this.userId).then((fetchedUser) => {
            this.loggedUser = fetchedUser as any;
          });

          const obs = getDoc(
            doc(this.firestore, `${this.loggedUser?.type}_list/${this.userId}`)
          );

          return obs;
        } else {
          this.loggedUser = undefined;
          this.router.navigate(['/login']);
        }
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
  async createUser(user: Citizen | Town, type: string): Promise<any> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        user.email,
        user.password
      );
      await setDoc(
        doc(this.firestore, `${type}_list/${userCredential.user.uid}`),
        user
      );
      return userCredential.user;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Sign user in
   * @param email {string} User email
   * @param password {string} User passwrod
   */
  async signIn(email: string, password: string) {
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
      this.logout$?.next();
      this.logout$?.complete();
      this.loggedUser = undefined;
      this.router.navigate(['/login']);
    });
  }
}
