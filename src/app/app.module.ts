import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { PlayerDescriptionComponent } from './player-description/player-description.component';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes =[
  {path: 'home', component: HomeComponent},
  {path: 'players', component: PlayersComponent},
  {path: 'players/:id', component: PlayerDescriptionComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    PlayerDescriptionComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
