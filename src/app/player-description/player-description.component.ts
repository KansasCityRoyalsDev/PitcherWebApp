import { Component, Input, OnInit, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pitcher} from '../Pitcher';
import {PitcherComment} from './PitcherComment'

import {DataService} from '../data.service';


@Component({
  selector: 'app-player-description',
  templateUrl: './player-description.component.html',
  styleUrls: ['./player-description.component.css'],
  providers: [DataService]
})
export class PlayerDescriptionComponent implements OnInit {
  @Input()
  myPitcher: Pitcher;
  pitchingGrips: string[] = [];
  id:number; private sub: any;
  
  pitcherComments: PitcherComment[] = [];

  toggle: boolean = false;

  gripImages = {
    'FB' : "https://lh3.googleusercontent.com/NFps1CflQEfC5T2Vn64xN-m759k6xX6Ku6mOA8sqWTej9JqTeAThHusS9If-Hzgw9CVtqIsRpYW89YfAV8FoKoYbJ0rVxFviiQ4NGR3_fIAsV4QRuGkqgwW5umCMiki8S_tFCowO",
    'CB' : "https://lh3.googleusercontent.com/BQ34h0bJVJ0vgc_xXZ4oeP4OIVsYImEnC6wPJFl36VgYbWge3Nol7AwWDhI4KiGzESntty2S6TMKAHIMbGLbfu3uDTWhJh7aAhFVcUDBY16ardhXc2i26fbV08Rx5OEg6pd9BVcu",
    'CH' : "https://lh3.googleusercontent.com/Qnpis2Lhe7YsXa8veFaapOMmbSelumLUgFw8tIVdt06sKTGKhLDfRj9312mT_64UnV8p5lp9udKXttMsr7eRQKITKcXSzlYCSe3ZGOkMaAgoQiO1UREX54tApm8prPFdGnQybPBV",
    'SL' : "https://lh3.googleusercontent.com/pfVfcYLQQO0FwfpLb3F_l--8B3dUUQvlruDhNddOZi4Uz4JO23fA4rkwZSCNQexkqGDNf-jWO47fLMutHj7IKj6qVYBujCsBp_4Re7rzLETJqhGvgVfB7bWw17l4iCHZqJT3Tx5U"
  }
  
  constructor(private _dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe( params => {
      this.id = +params['id'];
      this._dataService.getPitchers()
      .subscribe(
        response => {this.setPitcher(response);
          this._dataService.getComments()
          .subscribe(
            response => {this.setPitcherComments(response)},
          )}
      )
    })


  }

  setPitcherComments(res){
    for( let i = 1; i < res.values.length; i++){
      console.log(res.values[i][1].toLocaleLowerCase() + " " + this.myPitcher.firstName)
      if(res.values[i][1].toLocaleLowerCase().includes(this.myPitcher.firstName.toLocaleLowerCase()) && res.values[i][1].toLocaleLowerCase().includes(this.myPitcher.lastName.toLocaleLowerCase()) ){                                                             //CONDITION FOR COMMENT GOES HERE
        let myComment: PitcherComment = new PitcherComment;
        myComment.from = res.values[i][2];
        myComment.to = res.values[i][1];
        myComment.comment = res.values[i][3];
        this.pitcherComments.push(myComment)
      }
    }
    console.log(this.pitcherComments);
  }
  toggleCard(){
    this.toggle = !this.toggle;
    console.log(this.toggle)
  }
  pitcherImg(){
    if (this.myPitcher.img == "")
      return 'https://t3.ftcdn.net/jpg/00/64/67/80/240_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg';
    else 
      return this.myPitcher.img;
  }
  setPitcher(res){
    this.myPitcher = new Pitcher;
    for(let i = 1; i < res.values.length; i++){
      if(Number(res.values[i][10]) == this.id){
        this.myPitcher.lastName = res.values[i][0];
        this.myPitcher.firstName = res.values[i][1];
        this.myPitcher.img = res.values[i][2];
        this.myPitcher.height = res.values[i][3];
        this.myPitcher.dob = res.values[i][4]
        this.myPitcher.nationality = res.values[i][5];
        this.myPitcher.position = res.values[i][6];
        this.myPitcher.pitchingGrips = res.values[i][7].split(',').map( x => x.toLocaleUpperCase());
        this.pitchingGrips = this.myPitcher.pitchingGrips;
        this.myPitcher.yearSigned = res.values[i][8];
        this.myPitcher.levelsPlayed = res.values[i][9].split(',');
        this.myPitcher.id = res.values[i][10];

        console.log(this.myPitcher)
        return;
      }
    }
  }

}
