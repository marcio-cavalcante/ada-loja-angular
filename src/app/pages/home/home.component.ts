import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  // Verifica se o usuário está autenticado e exibe opções de logout
  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    alert('Clicado no logout! Usuário deslogado com sucesso!');
    this.authService.logout();
    // this.router.navigate(['/home/products']);
  }
}
