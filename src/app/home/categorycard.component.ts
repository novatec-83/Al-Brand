import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Response} from '@angular/http';
import { HttpService } from '../services/http-service';
import { Config } from '../../config';
@Component({
  selector: 'app-categorycard',
  templateUrl: './categorycard.component.html',
  styleUrls: ['./categorycard.component.scss']
})
export class CategorycardComponent implements OnInit {

  influencers;
  @Output() clicked = new
  EventEmitter<string>();
  constructor(private http: HttpService ) {
    this.http.get(Config.api + '/ml/categories', null, 'small')
        .subscribe(res => {
          this.influencers = res.json();
        });
  }
  ngOnInit() {
  }
  onClick(searchTerm: string){
    this.clicked.emit(searchTerm);
  }

}
