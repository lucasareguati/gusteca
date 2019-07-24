import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platillo } from '../models/platillo';
import {  } from '../components/platillo/platillo.component';

@Injectable({
  providedIn: 'root'
})
export class PlatilloService {
 // readonly URL_API = 'https://gusteca.herokuapp.com/platillo/';
 readonly URL_API = 'http://localhost:3000/platillo/';

  platillo: Platillo;
  platillos: Platillo[];
  selectedPlatillo: Platillo;

  constructor( private http: HttpClient ) {
    this.selectedPlatillo = new Platillo();
   }

  getPlatillos() {
    return this.http.get(this.URL_API);
  }

  postPlatillo(platillo: Platillo) {
    return this.http.post(this.URL_API, platillo);
  }

  putPlatillo(platillo: Platillo) {
    return this.http.put(this.URL_API + `${platillo.id_platillo}`, platillo );
  }

  deletePlatillo(id_platillo: string) {
    return this.http.delete(this.URL_API + `${id_platillo}`);

  }
  getPlatillo(id_platillo: string) {
    return this.http.get(this.URL_API + `${id_platillo}`);
  }
}
