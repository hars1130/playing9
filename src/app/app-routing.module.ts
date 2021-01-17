import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayBetsComponent } from './component/play-bets/play-bets.component';
import { PlayersListingComponent } from './component/players-listing/players-listing.component';

const routes: Routes = [
  { path: '', redirectTo: '/players', pathMatch: 'full' },
  { path: 'play-bets', component: PlayBetsComponent },
  { path: 'players', component: PlayersListingComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}