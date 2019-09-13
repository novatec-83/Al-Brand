import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../services/http-service";
import {Config} from "../../config";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Headers, Response, Http} from '@angular/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-change-password',
  template: `
      <preloader-full></preloader-full>

      <div class="page-center">
          <div class="page-center-in">
              <div class="container-fluid">
                  <form class="sign-box reset-password-box">
                      <!--<div class="sign-avatar">
                          <img src="img/avatar-sign.png" alt="">
                      </div>-->
                      <header class="sign-title">New Password</header>
                      <div class="form-group">
                          <input type="password" class="form-control" name = "pass1" placeholder="New Password" [(ngModel)] = "pass1"/>
                      </div>
                      <div class="form-group">
                          <input type="password" class="form-control" name = "pass2" placeholder="Confirm New Password" [(ngModel)] = "pass2"/>
                      </div>
                      <button type="submit" class="btn btn-rounded btn-block" (click)="reset_pass()">Submit</button>
                  </form>
              </div>
          </div>
      </div>
  `,
  styles: []
})
export class ChangePasswordComponent implements OnInit , OnDestroy{
    private sub: Subscription;
    loaded = false;
    private token:string;
    pass1:string;
    pass2:string;
  constructor(private http: HttpService   , private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
          this.token = params['token']; // (+) converts string 'id' to a number
          // alert(params['query']);
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');

          this.http.post(Config.api + '/api-token-verify/', JSON.stringify({
                  "token":this.token
              }),
              {headers: headers}).map((response: Response) => response.json()).subscribe(
              data => {
                    this.loaded = true;
              },
              error => {

                  this.router.navigate(['/page-not-found']);
              });

          // In a real app: dispatch action to load the details here.
      });
  }
    ngOnDestroy() {
        // localStorage.removeItem('navigated_list');
        this.sub.unsubscribe();

    }

    reset_pass(){
        if (!this.pass1){
            Swal.fire(
                'Password is required',
                '',
                'error'
            )
        }
        else if (this.pass1!==this.pass2) {
            Swal.fire(
                'Password not same',
                '',
                'error'
            )
        }
            else{

            // alert(params['query']);
            let headers = new Headers({'Authorization': 'JWT ' + this.token});
            headers.append('Content-Type', 'application/json');

            this.http.post(Config.api + '/new_password/', JSON.stringify({
                    "password":this.pass1
                }),
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    Swal.fire(
                        'Password changed successfully',
                        '',
                        'success'
                    ).then(() => {this.router.navigate(['/login']);});
                },
                error => {

                    Swal.fire(
                        'Server error',
                        '',
                        'error'
                    )
                });
            }

    }
}
