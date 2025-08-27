import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Conveniência para fácil acesso aos campos do formulário
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Para se o formulário for inválido
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    if (username || password) {
      this.authService.login(username, password).subscribe({
        next: (success) => {
          if (success) {
            const returnUrl =
              this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]);
          } else {
            this.error = 'Nome de usuário ou senha incorretos';
            this.loading = false;
          }
        },
        error: (error) => {
          this.error = 'Erro ao tentar fazer login';
          this.loading = false;
        },
      });
    }
  }
}
