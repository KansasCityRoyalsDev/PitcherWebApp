import { Component, OnInit } from '@angular/core';

import {Pitcher} from '../Pitcher';

import {DataService} from '../data.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
  providers: [DataService]
})
export class PlayersComponent implements OnInit {

  pitchers: Pitcher[] = [];
  filteredPitchers: Pitcher[] = [];
  private filter: string = "";

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.getPitchers()
    .subscribe(
      response => {this.setPitchers(response)},
    )
  }

  private setPitchers(res){
    for( let i = 1; i < res.values.length; i++){
      let myPitcher = new Pitcher;
      myPitcher.lastName = res.values[i][0];
      myPitcher.firstName = res.values[i][1];
      myPitcher.img = res.values[i][2];
      myPitcher.height = res.values[i][3];
      myPitcher.nationality = res.values[i][4];
      myPitcher.position = res.values[i][5];
      myPitcher.pitchingGrips = res.values[i][6].split(',');
      myPitcher.id = res.values[i][7];
      this.pitchers.push(myPitcher)
    }
    console.log(this.pitchers)
    this.filteredPitchers = this.pitchers;
  }

  onKey(event: any){
    this.filteredPitchers = this.pitchers.filter(data => {
      return (data.firstName + data.lastName).toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase());
    })
  }

}
