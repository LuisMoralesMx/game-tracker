import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import configData from '../../../public/assets/config/config.json';

export interface AppConfig {
  googleClientId: string;
  sessionKey: string;
}

@Service()
export class AppConfigService {
  private readonly http = inject(HttpClient, { optional: true });
  
  // Initialize with values imported from the default config.json
  private config: AppConfig = {
    googleClientId: configData.googleClientId,
    sessionKey: configData.sessionKey
  };

  async loadConfig(): Promise<void> {
    if (!this.http) {
      console.warn('HttpClient is not available. Using configuration from default config.json.');
      return;
    }
    
    try {
      const data = await firstValueFrom(
        this.http.get<AppConfig>('/assets/config/config.json')
      );
      if (data && data.googleClientId && data.sessionKey) {
        this.config = data;
      }
    } catch (error) {
      console.warn('Failed to load runtime config.json, falling back to default config.json values.', error);
    }
  }

  get googleClientId(): string {
    return this.config.googleClientId;
  }

  get sessionKey(): string {
    return this.config.sessionKey;
  }
}
