import { Component, OnInit } from '@angular/core';
import { PrincipalPlatilloComponent } from '../../platillo/principal-platillo/principal-platillo.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PlatilloService } from 'src/app/services/platillo.service';

@Component({
  selector: 'app-hithat',
  templateUrl: './hithat.component.html',
  styleUrls: ['./hithat.component.scss']
})
export class HithatComponent implements OnInit {

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
