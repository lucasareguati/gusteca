import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UsuarioService]
})

export class RegisterComponent implements OnInit {
  pass1: string;
  pass2: string;
  usuarioExiste: Boolean;
  usuarios: [];
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private authService: AuthService, private http: HttpClient, private usuarioService: UsuarioService, private afsauth: AngularFireAuth) {
    this.getUsers();
  }
  public error = false;
  public mensajeErr;

  ngOnInit() {
  }

  confirmarNombreUsuario() {
    let exist = true;
    this.usuarios.forEach(user => {
      const nombre: string = user['nombre_usuario'];
      if (nombre.toLocaleLowerCase() === this.usuarioService.selectedUsuario.nombre_usuario.toLocaleLowerCase()) {
        exist = false;
      }
    });
    return exist;
  }

  confirmarPass() {
    if (this.pass1 === this.pass2) {
      return true;
    } else { return false; }}

  registrarUsuario(form: NgForm) {
    this.afsauth.auth.createUserWithEmailAndPassword(form.value.email, form.value.contrasenia).then(() => {
      this.usuarioService.postUsuario(form.value) // guarda en la base de datos
        .subscribe(async (res) => {
          form.resetForm();
          // M.toast({html: 'Registrado correctamente'});
          const user = auth().currentUser;
          user.sendEmailVerification().then(() => {
            console.log('Verifica tu correo: ', user.email);
          }).catch(err => {
            console.log('Error: ', err);
          });
          this.authService.logoutUser();
          this.router.navigate(['/']);
        });
    }).catch(err => {
      this.error = true;
      this.mensajeErr = err;
      console.log('Error: ' + err);
    });
  }

  getUsers() {
    this.usuarioService.getNombreUsuarios().subscribe(res => {
      this.usuarios = res[0];
      console.log(res[0]);
    });
  }
}
