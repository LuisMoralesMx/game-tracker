export type GameStatus = 'Backlog' | 'Playing' | 'Completed' | 'Abandoned';

export interface Game {
  id: string;
  title: string;
  platform: string;
  status: GameStatus;
  playTime: number; // in hours
  rating: number; // 1 to 10 scale
  startDate?: string; // YYYY-MM-DD
  completionDate?: string; // YYYY-MM-DD
  notes?: string;
  updatedAt: string; // ISO timestamp
}
