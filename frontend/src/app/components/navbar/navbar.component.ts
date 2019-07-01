import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth} from '@angular/fire/auth';
import {UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private authService: AuthService, private afsAuth: AngularFireAuth) { }
  public app_name = 'Gusteka Drums';
  public isLogged = false;
  public isAdmin = false;


  ngOnInit() {
   this.getCurrentUser();

  }

  // Funcion para validar si se Logueo correctamente y si es admin
  getCurrentUser() {
    this.authService.isAuth().subscribe( auth => {
      if ( auth) {
        console.log('user logged', auth.email);
        this.isLogged = true;
        if (auth.email === 'lucasareguati@gmail.com' || auth.email === 'mateorogatky@gmail.com'){
          this.isAdmin = true;
        }
      } else {
        console.log('not user logged');
        this.isLogged = false;
      }
    });
  }


  onLogout() {
    this.afsAuth.auth.signOut();
    this.isAdmin = false;
  }

}
