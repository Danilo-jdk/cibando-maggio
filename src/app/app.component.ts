import { Component, OnInit} from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'cibando';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    console.log('qui sono nell onInit');
    if(JSON.parse(localStorage.getItem('user')) !== null){
      this.riceviRuolo();
    }
  }

  riceviRuolo(){
      this.userService.getUserProfile(JSON.parse(localStorage.getItem('user')).email).subscribe(
        res => {
          this.userService.userRole.next(res.role);
        }
      )
    }




}
