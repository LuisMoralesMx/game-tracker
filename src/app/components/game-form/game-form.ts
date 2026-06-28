import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game';
import { Game, GameStatus } from '../../models/game.model';

@Component({
  selector: 'app-game-form',
  imports: [RouterLink, FormsModule],
  templateUrl: './game-form.html',
  styleUrl: './game-form.css',
})
export class GameForm implements OnInit {
  private readonly gameService = inject(GameService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  // Form states as signals
  readonly isEditMode = signal(false);
  readonly gameId = signal<string | null>(null);

  readonly title = signal('');
  readonly platform = signal('');
  readonly status = signal<GameStatus>('Backlog');
  readonly playTime = signal(0);
  readonly rating = signal(8); // Default cozy rating
  readonly startDate = signal('');
  readonly completionDate = signal('');
  readonly notes = signal('');

  // Validation state
  readonly showTitleError = signal(false);

  // Derived state: only show completion date if status is 'Completed'
  readonly showCompletionDate = computed(() => this.status() === 'Completed');

  // List of standard platforms for autocomplete/quick selection
  readonly standardPlatforms = [
    'PC',
    'Nintendo Switch',
    'PlayStation 5',
    'Xbox Series X/S',
    'Retro (NES/SNES/Sega)',
    'Mobile'
  ];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const existingGame = this.gameService.getGameById(id);
      if (existingGame) {
        this.isEditMode.set(true);
        this.gameId.set(id);
        
        // Populate signals
        this.title.set(existingGame.title);
        this.platform.set(existingGame.platform);
        this.status.set(existingGame.status);
        this.playTime.set(existingGame.playTime);
        this.rating.set(existingGame.rating);
        this.startDate.set(existingGame.startDate || '');
        this.completionDate.set(existingGame.completionDate || '');
        this.notes.set(existingGame.notes || '');
      } else {
        // Game ID provided but not found, redirect to new
        this.router.navigate(['/game/new']);
      }
    }
  }

  saveGame() {
    // Basic validation
    if (!this.title().trim()) {
      this.showTitleError.set(true);
      return;
    }
    this.showTitleError.set(false);

    const gameData = {
      title: this.title().trim(),
      platform: this.platform().trim() || 'Unknown',
      status: this.status(),
      playTime: Math.max(0, this.playTime() || 0),
      rating: Math.max(1, Math.min(10, this.rating())),
      startDate: this.startDate() || undefined,
      completionDate: this.status() === 'Completed' ? (this.completionDate() || undefined) : undefined,
      notes: this.notes().trim() || undefined,
    };

    if (this.isEditMode()) {
      const id = this.gameId();
      if (id) {
        this.gameService.updateGame(id, gameData);
      }
    } else {
      this.gameService.addGame(gameData);
    }

    this.router.navigate(['/library']);
  }

  deleteGame() {
    const id = this.gameId();
    if (id) {
      const confirmDelete = confirm(`Are you sure you want to remove "${this.title()}" from your library?`);
      if (confirmDelete) {
        this.gameService.deleteGame(id);
        this.router.navigate(['/library']);
      }
    }
  }
}
