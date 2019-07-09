import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth} from '@angular/fire/auth';
import {UsuarioService } from '../../services/usuario.service';
import { ConsultaService } from 'src/app/services/consulta.service';
import { ConsultasComponent } from '../admin/consultas/consultas.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private consultaService: ConsultaService,
              private authService: AuthService, private afsAuth: AngularFireAuth, private consulta: ConsultasComponent) {
              this.consulta.obtenerSinRespuesta();
              }
  public app_name = 'Gusteka Drums';
  public isLogged = false;
  public isAdmin = false;


  ngOnInit() {
   this.authService.getCurrentUser();
  }

  // Funcion para validar si se Logueo correctamente y si es admin
  getCurrentUser() {
    this.authService.isAuth().subscribe( auth => {
      if ( auth) {
        console.log('user logged', auth.email);
        if (auth.email === 'lucasareguati@gmail.com' || auth.email === 'mateorogatky@gmail.com') {
        }
      } else {
        console.log('not user logged');
      }
    });
  }


  onLogout() {
    this.afsAuth.auth.signOut();
  }

}
