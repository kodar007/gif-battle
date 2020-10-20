import { Component, OnInit } from '@angular/core';
import { GifService } from '@app/core/services/gif.service';
import { Gif } from '@app/models/gif.model';

@Component({
  selector: 'app-leaderboard',
  template: `
    <h1 class="title has-text-centered">Leaderboard!</h1>
    <table class="table is-bordered is-hovered is-striped">
      <tbody>
        <tr *ngFor="let gif of leaderboardGifs; let i = index">
          <td>{{ i + 1 }}</td>
          <td>
            <app-gif [url]="gif.url" [caption]=""></app-gif>
          </td>
          <td>{{ gif.caption }}</td>
          <td>{{ gif.vote }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
  ]
})
export class LeaderboardComponent implements OnInit {
  leaderboardGifs: Gif[];

  constructor(private gifService: GifService) { }

  ngOnInit(): void {
    this.getLeaderboard();
  }

  getLeaderboard() {
    this.gifService.getLeaderboard()
      .subscribe(gifs => this.leaderboardGifs = gifs);
  }

}
