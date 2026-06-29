import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormField, form, required, hidden, submit, min, max } from '@angular/forms/signals';
import { GameService } from '../../services/game';
import { Game, GameStatus } from '../../models/game.model';

@Component({
  selector: 'app-game-form',
  imports: [RouterLink, FormField],
  templateUrl: './game-form.html',
  styleUrl: './game-form.css',
})
export class GameForm implements OnInit {
  private readonly gameService = inject(GameService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  // Mode states
  readonly isEditMode = signal(false);
  readonly gameId = signal<string | null>(null);

  // Form model
  protected readonly gameModel = signal({
    title: '',
    platform: '',
    status: 'Backlog' as GameStatus,
    playTime: 0,
    rating: '8',
    startDate: '',
    completionDate: '',
    notes: '',
  });

  // Form control structure
  protected readonly gameForm = form(this.gameModel, (s) => {
    required(s.title, { message: 'Please enter the game\'s title.' });
    min(s.playTime, 0);
    hidden(s.completionDate, {
      when: ({ valueOf }) => valueOf(s.status) !== 'Completed',
    });
  });

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
        
        // Populate model signal
        this.gameModel.set({
          title: existingGame.title,
          platform: existingGame.platform,
          status: existingGame.status,
          playTime: existingGame.playTime,
          rating: String(existingGame.rating),
          startDate: existingGame.startDate || '',
          completionDate: existingGame.completionDate || '',
          notes: existingGame.notes || '',
        });
      } else {
        // Game ID provided but not found, redirect to new
        this.router.navigate(['/game/new']);
      }
    }
  }

  saveGame() {
    submit(this.gameForm, async () => {
      const data = this.gameModel();
      const ratingVal = parseInt(data.rating, 10);
      const gameData = {
        title: data.title.trim(),
        platform: data.platform.trim() || 'Unknown',
        status: data.status,
        playTime: Math.max(0, data.playTime || 0),
        rating: Math.max(1, Math.min(10, isNaN(ratingVal) ? 8 : ratingVal)),
        startDate: data.startDate || undefined,
        completionDate: data.status === 'Completed' ? (data.completionDate || undefined) : undefined,
        notes: data.notes.trim() || undefined,
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
    });
  }

  deleteGame() {
    const id = this.gameId();
    if (id) {
      const confirmDelete = confirm(`Are you sure you want to remove "${this.gameModel().title}" from your library?`);
      if (confirmDelete) {
        this.gameService.deleteGame(id);
        this.router.navigate(['/library']);
      }
    }
  }
}
