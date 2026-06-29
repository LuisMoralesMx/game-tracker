import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [],
})
export class Login implements AfterViewInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  @ViewChild('googleBtnContainer', { static: false }) googleBtnContainer!: ElementRef;

  constructor() {
    // If already authenticated, redirect to dashboard immediately
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngAfterViewInit(): void {
    if (this.googleBtnContainer) {
      this.authService.renderGoogleButton(this.googleBtnContainer.nativeElement);
    }
  }
}
