import { Component, OnInit } from '@angular/core';
import { PlatilloService } from '../../../services/platillo.service';
import { Platillo } from 'src/app/models/platillo';
import { UsuarioService } from '../../../services/usuario.service';
import { CarritoService } from '../../../services/carrito.service';
import { ActivatedRoute } from '@angular/router';
import { ConsultaService } from '../../../services/consulta.service';
import { Consulta } from 'src/app/models/consulta';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AuthService } from 'src/app/services/auth.service';
import { Carrito } from 'src/app/models/carrito';
import { Carro } from 'src/app/models/carro';
import { Idcarrito } from 'src/app/models/id_carrito';
import { CarroService } from 'src/app/services/carro.service';
import { CompraService } from 'src/app/services/compra.service';
import { Compra } from 'src/app/models/compra';


 
@Component({
  selector: 'app-detalle-platillo',
  templateUrl: './detalle-platillo.component.html',
  styleUrls: ['./detalle-platillo.component.css']
})
export class DetallePlatilloComponent implements OnInit {

  platillo: Platillo;
  idPlato: string;
  isAdmn: Boolean;
  respuesta: string;
  cantidadPlatillo: number;

  constructor(private usuarioService: UsuarioService, private consultaService: ConsultaService,
              private platilloService: PlatilloService, private activatedRoute: ActivatedRoute,
              private auth: AuthService, private navbar: NavbarComponent, private carroService: CarroService,
              private carritoService: CarritoService, private compraService: CompraService ) {


  }
  ngOnInit() {
    this.idPlato = this.activatedRoute.snapshot.paramMap.get('id');
    this.platilloService.getPlatillo('/' + this.idPlato).subscribe(res => {
      this.platilloService.platillo = res as Platillo;
    });
    this.obtenerPreguntas();

  }

  preguntar(pregunta) {
    const consulta = new Consulta();
    consulta.id_platillo = Number(this.idPlato);
    consulta.id_usuario = this.usuarioService.usuarioLogueado.id_usuario;
    consulta.fecha = this.fechaActual();
    consulta.consulta = pregunta.viewModel;
    console.log(consulta);
    this.consultaService.postConsulta(consulta).subscribe(res => {
      console.log('Consulta creada con éxito');
    });

    this.consultaService.selectedConsulta.consulta = '';
  }

  obtenerPreguntas() {
    this.consultaService.getConsultas(Number(this.idPlato)).subscribe( res => {
      console.log(this.consultaService.consultas = res[0] as Consulta[]);
    });
  }

  comprar() {
    console.log('comprar');
  }

  responder(consulta) {
    consulta.respuesta = this.respuesta;
    console.log(consulta);
    this.consultaService.putConsulta(consulta).subscribe(res => {
      console.log('Respuesta guardada satisfactoriamente.');
      this.respuesta = '';
    });
  }

  agregarAlCarrito(platillo) {
    const carro = new Carro();
    const carrito = new Carrito();
    carrito.id_platillo = platillo.id_platillo;
    carrito.cantidad = this.cantidadPlatillo;
    carrito.activo = true;

    this.carritoService.postCarrito(carrito).subscribe((res) => {
      console.log('Carrito guardado con éxito');
      const id_carrito = res as Idcarrito;
      carro.id_carrito = id_carrito.id_carrito;
      carro.id_usuario = this.usuarioService.usuarioLogueado.id_usuario;

      this.carroService.postCarro(carro).subscribe(() => {
        console.log('Carro creado con éxito');
      });
    });
  }

  fechaActual() {
    const hoy = new Date();
    const dd = hoy.getDate();
    const mm = hoy.getMonth();
    const yy = hoy.getFullYear();

    return yy + '/' + mm + '/' + dd;
  }

}