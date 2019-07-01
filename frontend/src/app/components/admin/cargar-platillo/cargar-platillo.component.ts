import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PlatilloService } from '../../../services/platillo.service';
import { NgForm } from '@angular/forms';
import { Platillo } from 'src/app/models/platillo';
import { HttpClient} from '@angular/common/http';
import {AngularFireStorage} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

declare var M:  any;

@Component({
  selector: 'app-cargar-platillo',
  templateUrl: './cargar-platillo.component.html',
  styleUrls: ['./cargar-platillo.component.css'],
  providers: [PlatilloService
  ]
 
})
export class CargarPlatilloComponent implements OnInit {
  selectedFile = null;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;


  constructor(private http: HttpClient, private platilloService: PlatilloService, private storage: AngularFireStorage) { }

  @ViewChild('imagenPlatillo') inputImagenPlatillo: ElementRef;
  ngOnInit() {

  }

  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/platillo_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() =>
      this.urlImage = ref.getDownloadURL()
      )).subscribe();


  }

  addPlatillo(form: NgForm) {
    form.value.imagen =  this.inputImagenPlatillo.nativeElement.value;
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
