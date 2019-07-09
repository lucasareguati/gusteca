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

  public isAdmn = false;
  public isLogged: Boolean;

  constructor(private afsAuth: AngularFireAuth, private userS: UsuarioService, private authService: AuthService) {
  }

  getCurrentUser() {
    this.isAuth().subscribe( auth => {
      if ( auth) {
        console.log('user logged', auth.email);
        this.isLogged = true;
        if (auth.email === 'lucasareguati@gmail.com' || auth.email === 'mateorogatky@gmail.com'){
          this.isAdmn = true;
        }
      } else {
        console.log('not user logged');
        this.isLogged = false;
      }
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject ) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData => {
        this.isLogged = true;
        if (userData.user.email === 'lucasareguati@gmail.com') {
          this.isAdmn = true;
        }
        resolve(userData);
        })
      .catch(err => reject(err));

    });

  }
  logoutUser() {
    this.isAdmn = false;
    this.isLogged = false;
     return this.afsAuth.auth.signOut();
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }
}
