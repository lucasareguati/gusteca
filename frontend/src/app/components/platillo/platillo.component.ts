import { Component, OnInit } from '@angular/core';
import { PlatilloService } from '../../services/platillo.service';
import { NgForm } from '@angular/forms';
import { Platillo } from 'src/app/models/platillo';
import {AngularFireStorage} from '@angular/fire/storage';

declare var M:  any;

@Component({
  selector: 'app-platillo',
  templateUrl: './platillo.component.html',
  styleUrls: ['./platillo.component.css'],
  providers: [PlatilloService]
})
export class PlatilloComponent implements OnInit {

  constructor(private platilloService: PlatilloService) { }

  ngOnInit() {
    // this.getPlatillos();
  }

  addPlatillo(form: NgForm) {
    this.platilloService.postPlatillo(form.value)
    .subscribe(res => {
      this.limpiarForm(form);
      M.toast({html: 'Platillo guardado exitosamete'});
      this.getPlatillos();
    });
  }

  getPlatillos() {
    this.platilloService.getPlatillos().subscribe(res => {
      this.platilloService.platillos = res as Platillo[];
      console.log(res);
    });
  }

  limpiarForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.platilloService.selectedPlatillo = new Platillo();
    }

  }
}
