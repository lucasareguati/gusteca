import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carro } from '../models/carro';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  readonly URL_API = 'http://localhost:3000/carro/';


  carro: Carro[];
  selectedCarro: Carro;

  constructor(private http: HttpClient) {
    this.selectedCarro = new Carro();
   }

   getCarros(email: string) {
     return this.http.get(this.URL_API + `${email}`);
   }

   postCarro(carro: Carro) {
     return this.http.post(this.URL_API, carro);
   }

}





