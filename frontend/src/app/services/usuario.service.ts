import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { } from '../components/user/register/register.component';

@Injectable({
  providedIn: 'root'
})


export class UsuarioService {

  readonly URL_API = 'http://localhost:3000/usuario';

  usuarioLogueado: Usuario;
  // usuarios: Usuario[];
  selectedUsuario: Usuario;


  constructor(private http: HttpClient) {
    this.selectedUsuario = new Usuario();
  }

  getUsuario(correo: string) {
    return this.http.get(this.URL_API + `${correo}`);
  }

  postUsuario(usuario: Usuario) {
    return this.http.post(this.URL_API, usuario);
  }

  putUsuario(usuario: Usuario) {
    return this.http.put(this.URL_API + `/${usuario.id_usuario}`, usuario);
  }



}
