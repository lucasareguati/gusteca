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
  public error = false;
  public mensajeErr;
  private verificado = true;

  ngOnInit() {
  }

  onLogin(): void {

      this.authService.loginEmailUser(this.email, this.pass).then((res ) => { // autenticacion con firebase
        const user = auth().currentUser;
        if (user.emailVerified.valueOf()) {
        this.usuarioService.getUsuario('/' + this.email).subscribe( resp => { // consulta a la BBDD

          console.log(resp[0]); // En la posicion 0 de la respuesta se encuentra el objeto
          this.usuarioService.usuarioLogueado = resp[0] as Usuario;
          console.log(this.usuarioService.usuarioLogueado);
          if (!this.usuarioService.usuarioLogueado.activo) {
            this.onLogoutUser();
            console.log('Usuario inhabilitado');

          } else {
          this.router.navigate(['/']); // navega a la ruta /
          console.log(this.usuarioService.usuarioLogueado);
          }
        });
      } else {
        this.verificado = false;
        this.authService.logoutUser();
      }
      }).catch(err => {
        this.error = true;
        this.mensajeErr = err.message;
        console.log('Ha ocurrido un error: ', err.message);
      });
    }

  onLoginFacebook() {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then( res => {
      console.log('Logueado correctamente con Facebook');
      this.verificar();
    }).catch( err => {
      console.log( 'Error: ', err);
    });
    this.router.navigate(['/']);
  }

  onLoginGoogle() {
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
      this.usuarioService.getUsuario(user.email).subscribe( res => {
        this.usuarioService.usuarioLogueado = res[0] as Usuario;
        console.log(res[0]);

        if (res[0] === undefined) { // no esta registrado en BBDD
          console.log('USUARIO NO REGISTRADO');
          const usuario = new Usuario;
          usuario.email = user.email;
          usuario.nombre = user.displayName;
          usuario.tel = Number(user.phoneNumber);
          usuario.nombre_usuario = user.displayName;
          this.usuarioService.usuarioLogueado = usuario;
          console.log(usuario);
          this.usuarioService.postUsuario(usuario).subscribe( resp => {
            console.log('REGISTRADO CORRECTAMENTE');
            console.log(resp['id_usuario']);
            this.usuarioService.usuarioLogueado.id_usuario = resp['id_usuario'];
          });
        } else {
          if (!res[0].activo ) {
            this.onLogoutUser();
            window.alert('usuario deshabilitado');
          } else {
            window.alert('llego aca');
            this.authService.isLogged = true;
          }
        }
      });
  }




  onLogoutUser() {
    this.authService.logoutUser();

  }

}
