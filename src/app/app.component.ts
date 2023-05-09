import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cibando';
  evidenziato = false;

  // onEvidenziato() {
  //   if(this.evidenziato === true){
  //     this.evidenziato = false;
  //   } else {
  //     this.evidenziato = true;
  //   }
  // }

  // onEvidenziato() {
  //   if(this.evidenziato){
  //     this.evidenziato = false;
  //   } else {
  //     this.evidenziato = true;
  //   }
  // }

  onEvidenziato() {
      this.evidenziato = !this.evidenziato;
  }

}
