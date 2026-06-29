import { Service, signal, computed, inject, effect } from '@angular/core';
import { Game } from '../models/game.model';
import { AuthService } from './auth';

@Service()
export class GameService {
  private readonly authService = inject(AuthService);
  private readonly _games = signal<Game[]>([]);

  // Expose read-only games signal
  readonly games = this._games.asReadonly();

  // Stats computed from games
  readonly totalGames = computed(() => this._games().length);
  readonly completedGames = computed(() => this._games().filter(g => g.status === 'Completed').length);

  constructor() {
    // Load from storage reactively when the authenticated user changes
    effect(() => {
      const user = this.authService.currentUser();
      if (user) {
        this.loadFromStorage(user.id);
      } else {
        this._games.set([]);
      }
    });
  }

  private getStorageKey(userId: string): string {
    return `cozy-game-tracker-library_${userId}`;
  }

  private loadFromStorage(userId: string) {
    try {
      const key = this.getStorageKey(userId);
      const stored = localStorage.getItem(key);
      if (stored) {
        this._games.set(JSON.parse(stored));
      } else {
        this._games.set([]);
      }
    } catch (error) {
      console.error('Failed to load games from localStorage:', error);
      this._games.set([]);
    }
  }

  private saveToStorage(games: Game[]) {
    const user = this.authService.currentUser();
    if (!user) return;

    try {
      const key = this.getStorageKey(user.id);
      localStorage.setItem(key, JSON.stringify(games));
    } catch (error) {
      console.error('Failed to save games to localStorage:', error);
    }
  }

  addGame(gameInput: Omit<Game, 'id' | 'updatedAt'>): void {
    const newGame: Game = {
      ...gameInput,
      id: crypto.randomUUID(),
      updatedAt: new Date().toISOString()
    };

    this._games.update(current => {
      const updated = [...current, newGame];
      this.saveToStorage(updated);
      return updated;
    });
  }

  updateGame(id: string, updatedFields: Partial<Omit<Game, 'id' | 'updatedAt'>>): void {
    this._games.update(current => {
      const updated = current.map(g => 
        g.id === id 
          ? { ...g, ...updatedFields, updatedAt: new Date().toISOString() } 
          : g
      );
      this.saveToStorage(updated);
      return updated;
    });
  }

  deleteGame(id: string): void {
    this._games.update(current => {
      const updated = current.filter(g => g.id !== id);
      this.saveToStorage(updated);
      return updated;
    });
  }

  getGameById(id: string): Game | undefined {
    return this._games().find(g => g.id === id);
  }
}

