import { Component, OnInit } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Config} from '../../config';
import {Router} from '@angular/router';

@Component({
  selector: 'app-subscription-history',
  templateUrl: './subscription-history.component.html',
  styleUrls: ['./subscription-history.component.scss']
})
export class SubscriptionHistoryComponent implements OnInit {
    private loaded: boolean;
     result: any;
     username ;
     currentUser;

  constructor(private httpNoPreloader: Http,  private router: Router) { }

  ngOnInit() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

      this.username= this.currentUser.username;
      console.log('Current Username', this.username);
            this.setPage();
  }

  setPage() {

        this.loaded = false;

                this.httpNoPreloader.post(Config.api + '/subscription/' , {
                  username: this.username
                })
                    .subscribe(res => {
                            this.result = res.json();
                            this.loaded = true;
                            console.log('Susbscription Result', this.result);

                        },
                        error => {
                            this.router.navigate(['page-not-found']);
                        });
            }

}
