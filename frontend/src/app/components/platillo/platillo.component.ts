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
  }
/*
  const cards = document.querySelectorAll('.card');

  function transition() {
    if (this.classList.contains('active')) {
      this.classList.remove('active')
    } else {
      this.classList.add('active');
    }
  }
  cards.forEach(card => card.addEventListener('click', transition)); */

}
