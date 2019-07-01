import { Component, OnInit } from '@angular/core';
import { PlatilloService } from '../../../services/platillo.service';
import { Platillo } from 'src/app/models/platillo';
import { Router } from '@angular/router';


@Component({
  selector: 'app-principal-platillo',
  templateUrl: './principal-platillo.component.html',
  styleUrls: ['./principal-platillo.component.css'],
  providers: [PlatilloService]

})
export class PrincipalPlatilloComponent implements OnInit {

  constructor(private platilloService: PlatilloService, private router: Router) { }

  ngOnInit() {
    this.getPlatillos();
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


