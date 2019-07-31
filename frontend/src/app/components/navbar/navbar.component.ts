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
              this.authService.logoutUser();
              }
  public app_name = 'Gusteka Drums';
  public isLogged = false;
  public isAdmin = false;
  public sinRespuesta: [];


  ngOnInit() {
   this.authService.getCurrentUser();
  }

  actualizarSinRespuesta() {
    this.consultaService.getConsultasSinRespuesta().subscribe((res) => {
      this.sinRespuesta = res[0] as [];
      this.consultaService.sinRespuestaNumero = this.sinRespuesta.length;
      console.log('Actualizando...');
    });
  }

  onLogout() {
    this.authService.logoutUser();
  }

}
