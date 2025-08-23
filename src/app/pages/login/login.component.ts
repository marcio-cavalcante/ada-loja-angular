import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}



//   ngOnInit(): void {
//   if (this.authService.getToken()) {
//     const destino = this.authService.isAdmin() ? '/home/products' : '/home/admin';
//     alert('Usuário já autenticado. Redirecionando ao menu principal.');
//     this.router.navigate([destino]);
//   }
// }

 login() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/home/products']);
      },
      error: () => {
        this.errorMessage = 'Usuário ou senha inválidos';
      }
    });
  }


  // onSubmit(): void {
  //   this.authService.login(this.username, this.password).subscribe({
  //     next: () => {
  //       if (this.authService.isAdmin()) {
  //         this.router.navigate(['/home/products']);
  //       } else {
  //         this.router.navigate(['/home/admin']);
  //       }
  //     },
  //     error: () => {
  //       this.errorMessage = 'Usuário ou senha inválidos.';
  //     }
  //   });
  // }

}
