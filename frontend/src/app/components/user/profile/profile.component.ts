import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { NgForm } from '@angular/forms';
import { CarroService } from '../../../services/carro.service';
import { CarritoService } from '../../../services/carrito.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Carrito } from 'src/app/models/carrito';
import { CompraService } from 'src/app/services/compra.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  usuario: Usuario;
  totalCarrito: number;

  constructor(private carroService: CarroService, private carritoService: CarritoService,
   private usuarioService: UsuarioService, private compraService: CompraService, private router: Router) {
  }

  ngOnInit() {
    this.usuario = this.usuarioService.usuarioLogueado;
    this.obtenerCarritos();
    console.log(this.usuario);
    this.obtenerPendiente();

  }

  comprar(carro) {
    this.compraService.postCompra(carro).subscribe((res) => {
      window.open(res['url']);
    });
  }

  editarUsuario(usuario: Usuario) {
    this.usuarioService.selectedUsuario = usuario;
  }

  guardarEdicionUsuario( editarUForm?: NgForm) {
    this.usuarioService.putUsuario(editarUForm.value).subscribe(res => {
      console.log('Cambios Guardados con Éxito');
    });
  }

  obtenerPendiente() {
    this.compraService.getMercadopagoPendiente(this.usuarioService.usuarioLogueado.id_usuario).subscribe( res => {
      this.compraService.datosPendiente = res as {};
      console.log(this.compraService.datosPendiente);
    });
  }


  eliminarCarrito(id_carrito) {
    console.log(id_carrito);
    this.carritoService.deleteCarrito(id_carrito).subscribe( res => {
      console.log(this.carritoService.selectedCarrito);
      this.router.navigate(['user/profile']);
      window.alert('Eliminado correctamente');
      this.obtenerCarritos();
    });
  }

  obtenerCarritos() {
    this.carritoService.getCarritos(this.usuario.email).subscribe( res => {
      this.carritoService.carritos = res as Carrito[];
      console.log(this.carritoService.carritos);
    });
  }

}
