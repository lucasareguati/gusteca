import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { NgForm } from '@angular/forms';
import { CarroService } from '../../../services/carro.service';
import { CarritoService } from '../../../services/carrito.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Carrito } from 'src/app/models/carrito';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  usuario: Usuario;
  totalCarrito: number;

  constructor(private carroService: CarroService, private carritoService: CarritoService,
   private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.usuario = this.usuarioService.usuarioLogueado;
    this.obtenerCarritos();
    console.log(this.usuario);
  }

  editarUsuario(usuario: Usuario) {
    this.usuarioService.selectedUsuario = usuario;
  }

  guardarEdicionUsuario( editarUForm?: NgForm) {
    this.usuarioService.putUsuario(editarUForm.value).subscribe(res => {
      console.log('Cambios Guardados con Éxito');
    });
  }

  obtenerCarritos() {
    this.carritoService.getCarritos(this.usuario.email).subscribe( res => {
      this.carritoService.carritos = res as Carrito[];
      console.log(this.carritoService.carritos);
    });
  }

}
