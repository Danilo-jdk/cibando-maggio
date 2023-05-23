import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'cibando';

  constructor() {
    console.log('qui sono dentro al costruttore')
  }

  ngOnInit(): void {
console.log('qui sono nell onInit')
  }


}
