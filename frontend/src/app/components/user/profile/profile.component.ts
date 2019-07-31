import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { NgForm } from '@angular/forms';
import { CarroService } from '../../../services/carro.service';
import { CarritoService } from '../../../services/carrito.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Carrito } from 'src/app/models/carrito';
import { CompraService } from 'src/app/services/compra.service';
import { Router } from '@angular/router';

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
    this.obtenerPendiente();
    this.usuario = this.usuarioService.usuarioLogueado;
    this.obtenerCarritos();
    console.log('Compras');
    console.log(this.compraService.compras);

  }

  comprar(carro) {
    console.log(this.compraService.datosPendiente);
    if ( this.compraService.datosPendiente.length === 0 ) {
      console.log('LENGTH = 0');
    }
    if (this.compraService.datosPendiente === undefined || this.compraService.datosPendiente.length === 0) {
      console.log(carro)
      this.compraService.postCompra(carro).subscribe((res) => {
        window.open(res['url']);
    });
    } else {
      window.alert('No puedes realizar otra compra, tienes una pendiente :)');
    }
  }

  editarUsuario(usuario: Usuario) {
    this.usuarioService.selectedUsuario = usuario;
  }

  guardarEdicionUsuario( editarUForm?: NgForm) {
    this.usuarioService.putUsuario(editarUForm.value).subscribe(res => {
      if (res['name'] === 'SequelizeUniqueConstraintError') {
        window.alert('Telefono en uso por otro usuario');
      }
      
    });
  }

  obtenerPendiente() {
    this.compraService.getMercadopagoPendiente(this.usuarioService.usuarioLogueado.id_usuario).subscribe( res => {
      this.compraService.datosPendiente = res['listaPreferences'];
      this.compraService.compras = res['listaFacturas'];
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
