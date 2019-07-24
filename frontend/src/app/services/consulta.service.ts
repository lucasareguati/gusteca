import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consulta } from '../models/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  //readonly URL_API = 'https://gusteca.herokuapp.com/consulta/';
  readonly URL_API = 'http://localhost:3000/consulta/';

  consultas: Consulta[];
  consulta: Consulta;
  selectedConsulta: Consulta;
  sinRespuestaNumero: number;

  constructor(private http: HttpClient) {
    this.selectedConsulta = new Consulta();
   }

   getConsultasSinRespuesta() {
     return this.http.get(this.URL_API);
   }

   getConsultas(id_platillo: number) {
     return this.http.get(this.URL_API + `${id_platillo}`);
   }

   postConsulta(consulta: Consulta) {
     return this.http.post(this.URL_API, consulta);
   }

   putConsulta(consulta: Consulta) {
     return this.http.put(this.URL_API + `${consulta.id_consulta}`, consulta);
   }

}

