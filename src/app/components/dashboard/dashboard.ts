import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameService } from '../../services/game';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private readonly gameService = inject(GameService);

  readonly totalGames = this.gameService.totalGames;
  readonly completedGames = this.gameService.completedGames;
}
