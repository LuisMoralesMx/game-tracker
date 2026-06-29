import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from './auth';

@Component({
  template: ''
})
class DummyLoginComponent {}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: 'login', component: DummyLoginComponent }
        ])
      ]
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to not authenticated', () => {
    expect(service.isAuthenticated()).toBeFalsy();
    expect(service.currentUser()).toBeNull();
  });

  it('should clear authentication state on logout', () => {
    // Set mock user in session
    localStorage.setItem('cozy-game-tracker-session', JSON.stringify({
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      picture: 'pic.png'
    }));

    // Re-instantiate service using manual constructor within injection context to pick up fresh session
    let freshService: AuthService | undefined;
    TestBed.runInInjectionContext(() => {
      freshService = new AuthService();
    });

    expect(freshService!.currentUser()).toBeTruthy();

    freshService!.logout();
    expect(freshService!.currentUser()).toBeNull();
    expect(localStorage.getItem('cozy-game-tracker-session')).toBeNull();
  });
});
