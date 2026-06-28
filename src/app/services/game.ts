import { Service, signal, computed } from '@angular/core';
import { Game } from '../models/game.model';

@Service()
export class GameService {
  private readonly STORAGE_KEY = 'cozy-game-tracker-library';
  private readonly _games = signal<Game[]>([]);

  // Expose read-only games signal
  readonly games = this._games.asReadonly();

  // Stats computed from games
  readonly totalGames = computed(() => this._games().length);
  readonly completedGames = computed(() => this._games().filter(g => g.status === 'Completed').length);

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this._games.set(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load games from localStorage:', error);
    }
  }

  private saveToStorage(games: Game[]) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(games));
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
