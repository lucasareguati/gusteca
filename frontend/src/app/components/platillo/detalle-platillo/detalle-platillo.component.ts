import { Component, OnInit } from '@angular/core';
import { PlatilloService } from '../../../services/platillo.service';
import { Platillo } from 'src/app/models/platillo';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { ConsultaService } from '../../../services/consulta.service';
import { Consulta } from 'src/app/models/consulta';

@Component({
  selector: 'app-detalle-platillo',
  templateUrl: './detalle-platillo.component.html',
  styleUrls: ['./detalle-platillo.component.css']
})
export class DetallePlatilloComponent implements OnInit {

  platillo: Platillo;
  idPlato: string;

  constructor(private usuarioService: UsuarioService, private consultaService: ConsultaService,
              private platilloService: PlatilloService, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.idPlato = this.activatedRoute.snapshot.paramMap.get('id');
    this.platilloService.getPlatillo('/' + this.idPlato).subscribe(res => {
      this.platilloService.platillo = res as Platillo;
    });
    this.obtenerPreguntas();

  }

  agregarAlCarrito(){
    
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


  fechaActual() {
    const hoy = new Date();
    const dd = hoy.getDate();
    const mm = hoy.getMonth();
    const yy = hoy.getFullYear();

    return yy + '/' + mm + '/' + dd;
  }

}