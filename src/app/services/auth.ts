import { Service, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from '../models/user.model';

declare var google: any;

@Service()
export class AuthService {
  private readonly router = inject(Router);
  private readonly SESSION_KEY = 'cozy-game-tracker-session';
  // Replace this with your actual Google Client ID from Google Cloud Console
  private readonly CLIENT_ID = 'Replace this with your actual Google Client ID from Google Cloud Console';

  private readonly _currentUser = signal<UserProfile | null>(null);
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this._currentUser() !== null);

  private readonly _isSdkLoaded = signal<boolean>(false);
  readonly isSdkLoaded = this._isSdkLoaded.asReadonly();

  constructor() {
    this.initializeSession();
  }

  private initializeSession(): void {
    // 1. Restore local session if present
    try {
      const savedUser = localStorage.getItem(this.SESSION_KEY);
      if (savedUser) {
        this._currentUser.set(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Failed to parse user session from local storage:', e);
    }

    // 2. Load Google Identity Services SDK dynamically
    this.loadGsiScript()
      .then(() => {
        this._isSdkLoaded.set(true);
        this.initGoogleAuthSdk();
      })
      .catch((err) => {
        console.error('Failed to load Google Identity Services SDK:', err);
      });
  }

  private loadGsiScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof google !== 'undefined' && google.accounts?.id) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = (e) => reject(e);
      document.head.appendChild(script);
    });
  }

  private initGoogleAuthSdk(): void {
    if (typeof google !== 'undefined' && google.accounts?.id) {
      google.accounts.id.initialize({
        client_id: this.CLIENT_ID,
        callback: (response: any) => this.handleCredentialResponse(response),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
    }
  }

  renderGoogleButton(element: HTMLElement): void {
    if (this._isSdkLoaded()) {
      google.accounts.id.renderButton(element, {
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
      });
    } else {
      // If SDK isn't loaded yet, wait and render it when loaded
      const checkInterval = setInterval(() => {
        if (this._isSdkLoaded()) {
          google.accounts.id.renderButton(element, {
            theme: 'outline',
            size: 'large',
            text: 'signin_with',
            shape: 'rectangular',
          });
          clearInterval(checkInterval);
        }
      }, 100);
    }
  }

  private handleCredentialResponse(response: any): void {
    const token = response.credential;
    if (!token) return;

    try {
      const payload = this.decodeToken(token);
      const userProfile: UserProfile = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      };

      this._currentUser.set(userProfile);
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(userProfile));

      // Redirect to dashboard on successful login
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Failed to authenticate Google token payload:', error);
    }
  }

  private decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  logout(): void {
    try {
      if (typeof google !== 'undefined' && google.accounts?.id && this._currentUser()) {
        // Revoke Google tokens if necessary or disable auto-select
        google.accounts.id.disableAutoSelect();
      }
    } catch (e) {
      console.warn('Google SDK logout warning:', e);
    }

    this._currentUser.set(null);
    localStorage.removeItem(this.SESSION_KEY);
    this.router.navigate(['/login']);
  }
}
