import { Component, OnInit } from '@angular/core';
import { PlatilloService } from '../../../services/platillo.service';
import { Platillo } from 'src/app/models/platillo';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-principal-platillo',
  templateUrl: './principal-platillo.component.html',
  styleUrls: ['./principal-platillo.component.css'],
  providers: [PlatilloService]

})
export class PrincipalPlatilloComponent implements OnInit {

  constructor(private platilloService: PlatilloService, private router: Router,private _sanitizer: DomSanitizer) { }
  pageActual: Number = 1;

  ngOnInit() {
    this.getPlatillos();
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
}

  getPlatillos() {
    this.platilloService.getPlatillos().subscribe(res => {
      this.platilloService.platillos = res as Platillo[];
      console.log(res);
    });
  }

  verPlatillo(idx: string) {
    this.router.navigate( ['/platillo', idx]);
  }

}


