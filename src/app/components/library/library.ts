import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game';
import { Game, GameStatus } from '../../models/game.model';

@Component({
  selector: 'app-library',
  imports: [RouterLink, FormsModule],
  templateUrl: './library.html',
  styleUrl: './library.css',
})
export class Library {
  private readonly gameService = inject(GameService);

  // Filter & Sort States
  readonly searchQuery = signal('');
  readonly selectedStatus = signal<string>('All');
  readonly selectedPlatform = signal<string>('All');
  readonly selectedSort = signal<string>('updatedAtDesc');

  // Available unique platforms based on currently tracked games
  readonly availablePlatforms = computed(() => {
    const games = this.gameService.games();
    const platforms = new Set<string>();
    games.forEach(g => {
      if (g.platform.trim()) {
        platforms.add(g.platform.trim());
      }
    });
    return Array.from(platforms).sort();
  });

  // Filtered and sorted games
  readonly filteredGames = computed(() => {
    let result = [...this.gameService.games()];

    // 1. Search Query Filter
    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      result = result.filter(g => g.title.toLowerCase().includes(query));
    }

    // 2. Status Filter
    const statusFilter = this.selectedStatus();
    if (statusFilter !== 'All') {
      result = result.filter(g => g.status === statusFilter);
    }

    // 3. Platform Filter
    const platformFilter = this.selectedPlatform();
    if (platformFilter !== 'All') {
      result = result.filter(g => g.platform.trim() === platformFilter);
    }

    // 4. Sorting
    const sort = this.selectedSort();
    result.sort((a, b) => {
      switch (sort) {
        case 'titleAsc':
          return a.title.localeCompare(b.title);
        case 'titleDesc':
          return b.title.localeCompare(a.title);
        case 'ratingDesc':
          return b.rating - a.rating;
        case 'playTimeDesc':
          return b.playTime - a.playTime;
        case 'updatedAtDesc':
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

    return result;
  });

  // Helpers to render stars or friendly styles
  getRatingStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(10 - rating);
  }

  getStatusClass(status: GameStatus): string {
    return `status-badge status-${status.toLowerCase()}`;
  }

  updateSearchQuery(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  updateStatusFilter(status: string) {
    this.selectedStatus.set(status);
  }
}
