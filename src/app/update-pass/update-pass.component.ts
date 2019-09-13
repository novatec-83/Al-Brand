import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../_services';
import Swal from "sweetalert2";

@Component({
  selector: 'app-update-pass',
  templateUrl: './update-pass.component.html',
  styleUrls: ['./update-pass.component.css'],
    providers:[AuthenticationService]
})
export class UpdatePassComponent implements OnInit {
     response;

  constructor(private obj:AuthenticationService) { }
    currentUser;
  username;
  model:any={};
  currentPass;
  newPass;
  confirmPass;
  ngOnInit() {
  this.currentUser= JSON.parse(localStorage.getItem('currentUser'));
  this.username= this.currentUser.username;
  console.log(this.currentUser)
  }

  ChangePassword(){
    this.obj.changepassword(this.username, this.currentPass, this.newPass, this.confirmPass)
        .subscribe(
            data => {

                Swal.fire('Success', 'Password Updated', 'success');;
                },
            error => {
              if(this.newPass!== this.confirmPass)
              {
                  Swal.fire('oops', 'Password not match', 'error')

              }
                else  if(error.status==400)
                {
                      Swal.fire('oops', 'Incorrect current Password', 'error')
                  }
              else  if(this.newPass== this.currentPass)
              {
                  Swal.fire('oops', 'Current & Old Password Cannot be Same', 'error')
              }
            }
        );
  }

}
