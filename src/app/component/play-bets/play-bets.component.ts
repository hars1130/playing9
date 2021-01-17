import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/model/player';
import { PlayersService } from 'src/app/service/players.service';

@Component({
  selector: 'app-play-bets',
  templateUrl: './play-bets.component.html',
  styleUrls: ['./play-bets.component.scss']
})
export class PlayBetsComponent implements OnInit {

  constructor(private playersService: PlayersService,private router: Router,) { }

  selectedPlayers: Player[];
  opposingBet: number;
  max: number;
  ngOnInit(): void {
    this.selectedPlayers = [...this.playersService.getSelectedPlayersList()];
    if(this.selectedPlayers.length !=9){
      this.router.navigate(['/players'])
    }
    else{
      this.max = 9;
      this.opposingBet = this.getRandomInt(this.max);
      this.selectedPlayers.map(p => p["winnings"] = p.bet == this.opposingBet ? p.price* 2 : 0);
    }
  }

  getRandomInt(max) {
    return Math.ceil(Math.random() * Math.floor(max));
  }

}
