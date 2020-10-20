import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gif } from '@app/models/gif.model';

@Injectable({
  providedIn: 'root'
})
export class GifService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // CREATE =====================================
  // get a random gif
  getRandom() : Observable<Gif> {
    return this.http.get<Gif>(`${this.apiUrl}/random`);
  }

  // save gif
  save(id: string, url: string, caption: string) : Observable<any> {
    return this.http.post(this.apiUrl, { id, url, caption, vote: 0 });
  }

  // BATTLE =====================================
  // get a battle (2 gifs)
  getBattle() : Observable<Gif[]> {
    return this.http.get<Gif[]>(`${this.apiUrl}/versus`);
  }

  // vote on a gif
  vote(id) : Observable<any> {
    return this.http.post(`${this.apiUrl}/vote`, { id })
  }

  // LEADERBOARD ================================
  // get leaderboard
  getLeaderboard(): Observable<Gif[]> {
    return this.http.get<Gif[]>(`${this.apiUrl}/leaderboard`);
  }
}
