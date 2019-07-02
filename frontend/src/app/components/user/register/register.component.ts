import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { HttpClient } from '@angular/common/http';
import {AngularFireAuth  } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import { auth } from 'firebase';
import 'firebase/auth';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UsuarioService]
})



export class RegisterComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private authService: AuthService, private http: HttpClient, private usuarioService: UsuarioService, private afsauth: AngularFireAuth) { }
    public error = false;
    public mensajeErr;

   ngOnInit() {
  }

  registrarUsuario(form: NgForm) {

    this.afsauth.auth.createUserWithEmailAndPassword(form.value.email, form.value.contrasenia).then( () => {
      this.usuarioService.postUsuario(form.value) // guarda en la base de datos
        .subscribe( async res => {
          form.resetForm();
          // M.toast({html: 'Registrado correctamente'});
          const user = auth().currentUser;
          user.sendEmailVerification().then( () => {
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
}

