// Aca va todo lo relacionado con el login de users
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import { UsuarioService} from './usuario.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private userS: UsuarioService) { }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject ) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData))
      .catch(err => reject(err));

    });

  }

  loginFacebookUser() {
//    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  loginGoogleUser() {
  //  return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logoutUser() {
     return this.afsAuth.auth.signOut();
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }
}
