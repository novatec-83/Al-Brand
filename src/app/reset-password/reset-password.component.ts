import { Component, OnInit } from '@angular/core';
import {Config} from "../../config";
// import {HttpService} from '../serv/http-service';
import {HttpService} from '../services/http-service';
import Swal from 'sweetalert2';
import {Headers, Response, Http} from '@angular/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'

})
export class ResetPasswordComponent implements OnInit {
  email;
  constructor(private http: HttpService) { }

  ngOnInit() {
  }
    reset_password(){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(Config.api + '/forget_password/', JSON.stringify({
                email: this.email
            }),
            {headers: headers}).map((response: Response) => response.json()).subscribe(
            data => {

                Swal.fire(
                    'Reset password email sent',
                    '',
                    'success'
                )
            },
            error => {

                Swal.fire(
                    'Wrong email/username',
                    '',
                    'error'
                )
            });
    }

}
