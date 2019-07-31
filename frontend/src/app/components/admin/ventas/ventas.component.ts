import { Component, OnInit } from '@angular/core';
import { CompraService } from 'src/app/services/compra.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  constructor(private compraService: CompraService) { }

  ngOnInit() {
    this.obtenerCompras();
  }

  obtenerCompras() {
    this.compraService.getCompras().subscribe( res => {
      this.compraService.compras = res as [];
    });
  }

}
