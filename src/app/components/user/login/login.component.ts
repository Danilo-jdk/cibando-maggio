import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {

  loginError = '';
  user: any;

  constructor(private router: Router, private auth: AuthService, private messageService: MessageService){}

  onSubmit(credentials: any){
    if(credentials.email !== '' && credentials.password !== ''){
      this.auth.login(credentials.email, credentials.password).subscribe({
        next: (res) => {
          this.user = res;

          if(res) {
            this.auth.saveStorage(res);
            this.messageService.add({severity: 'success', summary: 'Successo!', detail: 'Login effettuato con successo', life: 3000});
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 3000);
          }
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({severity: 'error', summary: 'Errore!', detail: 'Attenzione email o password errati', life: 3000});
          this.loginError = 'Attenzione email o password errati';
        }
      })
    }
  }
}
