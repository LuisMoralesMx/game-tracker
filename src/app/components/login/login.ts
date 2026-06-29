import { Component, ElementRef, inject, viewChild, effect } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [],
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly googleBtnContainer = viewChild<ElementRef>('googleBtnContainer');

  constructor() {
    // If already authenticated, redirect to dashboard immediately
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }

    effect(() => {
      const container = this.googleBtnContainer();
      if (container) {
        this.authService.renderGoogleButton(container.nativeElement);
      }
    });
  }
}
