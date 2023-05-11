import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
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
  constructor() {
    console.log('qui sono dentro al costruttore')
  }

  ngOnInit(): void {
console.log('qui sono nell onInit')
  }

  onEvidenziato() {
      this.evidenziato = !this.evidenziato;
  }


}
