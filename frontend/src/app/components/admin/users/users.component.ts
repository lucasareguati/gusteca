import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getUsuarios();
  }
 
  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(res => {
      this.usuarioService.usuarios = res as Usuario[];
      console.log(res);
    });
  }


}
