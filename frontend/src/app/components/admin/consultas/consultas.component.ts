import { Component, OnInit } from '@angular/core';
import { ConsultaService } from 'src/app/services/consulta.service';
import { Consulta } from '../../../models/consulta';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit {

  constructor(private consultaService: ConsultaService) { }

  sinRespuesta: [];

  ngOnInit() {
    this.obtenerSinRespuesta();
  }

  obtenerSinRespuesta() {
    this.consultaService.getConsultasSinRespuesta().subscribe(res => {
      this.sinRespuesta = res[0] as [];
      this.consultaService.sinRespuestaNumero = this.sinRespuesta.length;
    });

  }

}
