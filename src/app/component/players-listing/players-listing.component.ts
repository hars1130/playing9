import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/model/player';
import { PlayersService } from 'src/app/service/players.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-players-listing',
  templateUrl: './players-listing.component.html',
  styleUrls: ['./players-listing.component.scss']
})
export class PlayersListingComponent implements OnInit {

  players: Player[];
  selectedPlayers: Player[];
  userSearch="";
  pageNumber:number;
  maxPage:number;
  minPage:number;
  playersPerPage: number;

  constructor(private playersService: PlayersService,private router: Router,) { }

  ngOnInit() {
    this.selectedPlayers = [];
    this.getPlayers();
    this.pageNumber = 1;
    this.playersPerPage = 10;
    this.minPage = 1;
  }

  getPlayers(): void {
    this.playersService.isLoadingFinished
    .subscribe(loaded => {
      if(loaded){
        this.players = [...this.playersService.getPlayersList()];
        this.maxPage = Math.floor(this.players.length/10);
        this.selectedPlayers = [...this.playersService.getSelectedPlayersList()];
      }
    });
  }

  toggleSelection(row){
    if(!row.isSelected && this.selectedPlayers.length==9){
      alert('Playing nine selected!')
    }
    else{
      row.isSelected ? this.selectedPlayers.splice(this.selectedPlayers.findIndex(p=> p.id === row.id),1) : this.selectedPlayers.push({...row}) 
      row.isSelected = !row.isSelected;
    }
  }

  onStart(){
    if(this.selectedPlayers.length<9){
      alert("you have selected "+this.selectedPlayers.length+" player(s) only")
    }
    else{
      this.playersService.setSelectedPlayers(this.selectedPlayers);
      this.router.navigate(['/play-bets']);
    }
  }

}
