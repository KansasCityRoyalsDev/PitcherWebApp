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

  id:number; private sub: any;
  
  pitcherComments: PitcherComment[] = [];

  toggle: boolean = false;

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
  setPitcher(res){
    this.myPitcher = new Pitcher;
    for(let i = 1; i < res.values.length; i++){
      if(Number(res.values[i][7]) == this.id){
        this.myPitcher.lastName = res.values[i][0];
        this.myPitcher.firstName = res.values[i][1];
        this.myPitcher.img = res.values[i][2];
        this.myPitcher.height = res.values[i][3];
        this.myPitcher.nationality = res.values[i][4];
        this.myPitcher.position = res.values[i][5];
        this.myPitcher.pitchingGrips = res.values[i][6].split(',');
        this.myPitcher.id = res.values[i][7];
        console.log(this.myPitcher)
        return;
      }
    }
  }

}
