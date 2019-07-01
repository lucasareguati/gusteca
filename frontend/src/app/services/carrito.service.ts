import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Carrito} from '../models/carrito';


@Injectable({
  providedIn: 'root'
})

export class CarritoService {

  readonly URL_API = 'http://localhost:3000/carrito/';

  carritos: Carrito[];
  selectedCarrito: Carrito;

  constructor(private http: HttpClient) {
    this.selectedCarrito = new Carrito();
  }

  getCarritos(email: string) {
    return this.http.get(this.URL_API + `${email}`);
  }

  postCarrito(carrito: Carrito) {
    return this.http.post(this.URL_API, carrito);
  }

  putCarrito(carrito: Carrito) {
    return this.http.put(this.URL_API + `${carrito.id_carrito}`, carrito);
  }

}
