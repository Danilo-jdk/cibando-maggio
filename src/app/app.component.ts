import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cibando';

  images = [
    { id: 1, label: 'Spaghetti al sugo' },
    { id: 2, label: 'Tagliata di manzo' },
    { id: 3, label: 'Tiramisù' },
  ];

  percorsoFoto = '../assets/images/imageBg-';


coloreScelto = "green";

colore = "grey";

  onChangeColor(){
    this.colore = this.coloreScelto;
  }
}
