import { Component, OnInit } from '@angular/core';
import {AngularFireAuth  } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {AuthService} from '../../../services/auth.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';


// declare var M:  any; // Variable del toast

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor( private usuarioService: UsuarioService, public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }


  public userLogueado: Usuario = this.usuarioService.usuarioLogueado;
  public email = '';
  public pass = '';

  ngOnInit() {
  }

  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.pass).then((res ) => { // autenticacion con firebase
      this.usuarioService.getUsuario('/' + this.email).subscribe( res => { // consulta a la BBDD
        console.log(res[0]); // En la posicion 0 de la respuesta se encuentra el objeto
        this.usuarioService.usuarioLogueado = res[0] as Usuario;
        this.router.navigate(['/']); // navega a la ruta /
        console.log(this.usuarioService.usuarioLogueado);
      });

    }).catch(err => {
      console.log('Ha ocurrido un error: ', err.message);
      //  M.toast({html: err.message});
    });
  }

  onLoginFacebook() {
    // this.authService.loginFacebookUser().then((res) => {
     // this.router.navigate(['/']);
      // console.log(res);
   // }).catch(err => console.log('Error: ', err.message));
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then( res => {
      console.log('Logueado correctamente con Facebook');
      this.verificar();
    }).catch( err => {
      console.log( 'Error: ', err);
    });
    this.router.navigate(['/']);
  }

  onLoginGoogle() {
    // this.authService.loginGoogleUser().then((res) => {
      // this.router.navigate(['/']); // Verificar
      // console.log(auth().currentUser);
    // }).catch(err => console.log('Error: ', err.message));

    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(res =>  {
      console.log('Logueado correctamente');
      this.verificar();
    }).catch( err => {
      console.log('Error: ', err);
    });
    this.router.navigate(['/']);
  }

  verificar() { // Si ya inicio sesion lo trae de la BBDD sino lo registra
    const user = auth().currentUser;
      console.log(user.displayName, user.email);
      this.usuarioService.getUsuario('/' + user.email).subscribe( res => {
        this.usuarioService.usuarioLogueado = res[0] as Usuario;

        if (res[0] === undefined) { // no esta registrado en BBDD
          const usuario = new Usuario;
          usuario.email = user.email;
          usuario.nombre = user.displayName;
          usuario.nombre_usuario = user.displayName;
          this.usuarioService.usuarioLogueado = usuario;
          console.log(usuario);
          this.usuarioService.postUsuario(usuario).subscribe( res => {
            console.log('CORRECTAMENTE');
          });
        }
      });
  }




  onLogoutUser() {
    this.authService.logoutUser();

  }

}
