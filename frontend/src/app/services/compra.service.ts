import { Injectable } from '@angular/core';
import {Compra} from '../models/compra';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  readonly URL_API = 'http://localhost:3000/compra/';

  compras: Compra[];
  selecteCompra: Compra;
  datosPendiente: {};

  constructor(private http: HttpClient) {
    this.selecteCompra = new Compra();
   }

  getMercadopagoPendiente(id) {
    return this.http.get(this.URL_API + id);
  }

  getCompras() {
    return this.http.get(this.URL_API);
  }

  postCompra(compra) {
    return this.http.post(this.URL_API, compra);
  }





}
