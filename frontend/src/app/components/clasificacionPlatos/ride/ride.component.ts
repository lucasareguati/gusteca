import { Component, OnInit } from '@angular/core';
import { Platillo } from 'src/app/models/platillo';
import { PlatilloService } from 'src/app/services/platillo.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { PrincipalPlatilloComponent } from '../../platillo/principal-platillo/principal-platillo.component';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.scss']
})
export class RideComponent implements OnInit {

  constructor(private platoComponent: PrincipalPlatilloComponent, private platilloService: PlatilloService, private router: Router,
    private _sanitizer: DomSanitizer) { }
  pageActual: Number = 1;

  ngOnInit() {
    this.platoComponent.getPlatillos();
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }


  verPlatillo(idx: string) {
    this.router.navigate( ['/platillo', idx]);
  }

}
