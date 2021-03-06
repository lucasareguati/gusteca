import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Carrito} from '../models/carrito';


@Injectable({
  providedIn: 'root'
})

export class CarritoService {

  //readonly URL_API = 'http://localhost:3000/carrito/';
  readonly URL_API = 'https://gusteca.herokuapp.com/carrito';

  totalCarrito: number;
  carritos: Carrito[];
  selectedCarrito: Carrito;

  constructor(private http: HttpClient) {
    this.selectedCarrito = new Carrito();
  }

  getCarritos(email: string) {
    return this.http.get(this.URL_API + `/${email}`);
  }

  postCarrito(carrito: Carrito) {
    return this.http.post(this.URL_API, carrito);
  }

  deleteCarrito(id_carrito: Number) {
    return this.http.delete(this.URL_API + `/${id_carrito}`);
  }

}
