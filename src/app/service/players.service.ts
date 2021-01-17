import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from '../model/player';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http: HttpClient) {
    this.setLocalPlayers();
   }

  httpOptions: any = {
    observe: 'response'
  };

  private players = [];
  private selectedPlayers = [];
  private _isLoadingFinished: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  public readonly isLoadingFinished: Observable<Boolean> = this._isLoadingFinished.asObservable();
  private apiUrl = "https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json";
  private jsonUrl = "assets/json/players-list.json";

  public getPlayersFromServer() {
    return this.http.get(this.apiUrl, this.httpOptions).pipe(map(result => result['body']));
  }

  public getPlayersListfromJSON() {
    return this.http.get(this.jsonUrl, this.httpOptions).pipe(map(result => result['body']));
  }

  public setLocalPlayers(){
    this.getPlayersFromServer().subscribe(players => {
      let id=0;
      this.players = players.map(p => ({ isSelected: false, name: p.Name, avatar: p["Profile Image"], bet: p.Bet, price: p.Price, wins: 0, lost: 0, id:id++,winnings: 0, }));
      this._isLoadingFinished.next(true);
    },
    error=>{
      this.getPlayersListfromJSON().subscribe(players => {
        let id=0;
        this.players = players.map(p => ({ isSelected: false, name: p.Name, avatar: p["Profile Image"], bet: p.Bet, price: p.Price, wins: 0, lost: 0, id:id++,winnings: 0, }));
        this._isLoadingFinished.next(true);
      });
    }
    )
  }

  public getPlayersList(){
    return this.players;
  }

  public setSelectedPlayers(players){
    this.selectedPlayers = [...players];
  }

  public getSelectedPlayersList(){
    return this.selectedPlayers;
  }

}
