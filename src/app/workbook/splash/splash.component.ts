import { Component } from '@angular/core';
import { Paragraph } from 'src/app/models/workbook';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent {
  images = ["abodunde.jpg", "achiaka.jpg", "adetunji.jpg", "adigun.jpg", "awoonidanla.jpg",
    "ayeni.jpg", "ball.jpg", "ladipo.jpg", "mosuro.jpg", "muyibi.jpg", "ogunbode.jpg", "olalemi.jpg",
    "olawuyi.jpg", "salam.jpg", "ladipo_2.jpg", "solanke.jpg", "jite.jpg", "kalejaiye_1.jpg",
    "folasire.jpg", "adetunji_2.jpg", "irabor.jpg", "ilori.jpg", "olorunsola.jpg"]

  randomImage: Paragraph = { metatype: '', content: [] };

  constructor() { }

  ngOnInit(): void {
    const rand = Math.random() * (this.images.length - 1);
    const randToInt = Math.floor(rand);
    this.randomImage = {
      metatype: "",
      content: []
    };
  }
}
