import { Component, OnInit } from '@angular/core';
import { PlatilloService } from '../../../services/platillo.service';
import { Platillo } from 'src/app/models/platillo';
import { NgForm } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';


declare var M: any;


@Component({
  selector: 'app-editar-platillo',
  templateUrl: './editar-platillo.component.html',
  styleUrls: ['./editar-platillo.component.css']
})
export class EditarPlatilloComponent implements OnInit {

  constructor(private http: HttpClient, private platilloService: PlatilloService) { }

  ngOnInit() {
    this.getPlatillos();
  }

  public generatePDF() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
 // Few necessary setting options
    const imgWidth = 208;
    const pageHeight = 295;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    const heightLeft = imgHeight;
 
    const contentDataURL = canvas.toDataURL('image/png');
    const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF 
    const position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    pdf.save('GustekaInv.pdf'); // Generated PDF
  });
 }


  getPlatillos() {
    this.platilloService.getPlatillos().subscribe(res => {
      this.platilloService.platillos = res as Platillo[];
    });

  }

  bajaOAltaPlatillo() {
    if (this.platilloService.selectedPlatillo.baja) {
      this.platilloService.selectedPlatillo.baja = false;
      this.platilloService.putPlatillo(this.platilloService.selectedPlatillo).subscribe(res => {
        this.getPlatillos();
        console.log('Alta exitosa');
    });
    } else {
      this.platilloService.selectedPlatillo.baja = true;
      this.platilloService.putPlatillo(this.platilloService.selectedPlatillo).subscribe(res => {
        this.getPlatillos();
        console.log('Baja Exitosa');
    });
  }

  }


  editarPlatillo(platillo: Platillo) { // selecciona el platillo en el ngfor
    this.platilloService.selectedPlatillo = platillo;
  }

  guardarEdicionPlatillo(editarForm?: NgForm) {
    this.platilloService.putPlatillo(editarForm.value).subscribe(res => {
      this.getPlatillos();
    });
  }

}
