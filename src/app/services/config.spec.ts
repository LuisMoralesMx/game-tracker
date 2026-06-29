import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AppConfigService, AppConfig } from './config';
import { firstValueFrom } from 'rxjs';

describe('AppConfigService', () => {
  let service: AppConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppConfigService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AppConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default config values from JSON import initially', () => {
    expect(service.googleClientId).toBeTruthy();
    expect(service.sessionKey).toBe('YOUR_SESSION_KEY');
  });

  it('should load configuration successfully from http', async () => {
    const mockConfig: AppConfig = {
      googleClientId: 'mocked-client-id-via-http',
      sessionKey: 'mocked-session-key-via-http'
    };

    const loadPromise = service.loadConfig();

    const req = httpMock.expectOne('/assets/config/config.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockConfig);

    await loadPromise;

    expect(service.googleClientId).toBe('mocked-client-id-via-http');
    expect(service.sessionKey).toBe('mocked-session-key-via-http');
  });

  it('should fall back to default values if http load fails', async () => {
    const loadPromise = service.loadConfig();

    const req = httpMock.expectOne('/assets/config/config.json');
    req.flush('Error loading config', { status: 404, statusText: 'Not Found' });

    await loadPromise; // Should not throw/reject

    expect(service.googleClientId).toBeTruthy();
    expect(service.sessionKey).toBe('YOUR_SESSION_KEY');
  });
});
