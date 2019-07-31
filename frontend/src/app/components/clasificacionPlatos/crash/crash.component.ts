import { Component, OnInit } from '@angular/core';
import { PlatilloService } from 'src/app/services/platillo.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Platillo } from 'src/app/models/platillo';
import { PlatilloComponent } from '../../platillo/platillo.component';
import { PrincipalPlatilloComponent } from '../../platillo/principal-platillo/principal-platillo.component';


@Component({
  selector: 'app-crash',
  templateUrl: './crash.component.html',
  styleUrls: ['./crash.component.scss']
})
export class CrashComponent implements OnInit {

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
