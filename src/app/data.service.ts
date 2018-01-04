import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

const docID = '1tsJsvfTiuH0ebLjXAdnUDdMRiW6dotm_o2Gm_BiGWII'
const apiKey = 'AIzaSyDkyQIGCA0OHTCdnqiwD2XmNBlbYRbr4Qs';

@Injectable()
export class DataService {
  

  constructor(private _http: Http) { }

  public getPitchers(){
    return this._http.get('https://sheets.googleapis.com/v4/spreadsheets/'+docID+'/values/Sheet1?key='+apiKey)
    .map(this.extractData)
  }

  public getComments(){
    return this._http.get('https://sheets.googleapis.com/v4/spreadsheets/'+docID+'/values/Comments?key='+apiKey)
    .map(this.extractData)
  }

  private extractData(res){
    const body = res.json();
    console.log(body)
    return body;
    
  }
}
