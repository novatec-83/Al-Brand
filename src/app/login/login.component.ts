import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Config } from '../../config';
import {HttpService} from '../services/http-service';
import { AlertService, AuthenticationService } from '../_services';
import {Http, Response} from '@angular/http';
import  {UserService} from '../_services';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {RecapchaService} from '../recapcha/recapcha.service';
import swal from "sweetalert2";

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html',
    styleUrls: ['login.scss'],
    providers:[RecapchaService]
})

export class LoginComponent implements OnInit {
    model: any = {};
    returnUrl: string;
    influencers;
    class1= 'fa fa-eye';
    class2= 'fa fa-eye-splash';
    hide= true;
    recaptcha= true;
    userFormControl = new FormControl('', [
        Validators.required,
    ]);
    passwordFormControl = new FormControl('', [
        Validators.required]);
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private http: HttpService, private usersvc: UserService, private recptha: RecapchaService) { }

    ngOnInit() {
        // reset login status
            this.authenticationService.logout();

            // get return url from route parameters or default to '/'
            this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }

    private getuser() {
        let cu = JSON.parse(localStorage.getItem('currentUser'));
        this.usersvc.getByUsername(cu.username).subscribe(name => {
            // alert(name.first_name);

            cu.first_name = name['first_name'];
            localStorage.setItem('currentUser', JSON.stringify(cu));

        });
    }
    login() {
        this.recaptcha= this.recptha.check();
        // alert('Recaptcha Status is ' + this.recapcha);
        if(this.recaptcha == true) {
            this.authenticationService.login(this.model.username, this.model.password)
                .subscribe(
                    data => {

                        // this.getuser();
                        this.router.navigate([this.returnUrl]);
                        localStorage.setItem('currentPassword', this.model.password);

                        swal.fire({
                            type: 'success',
                            title: 'You have successfully logged in to influexpai.\n' +
                            '\n',
                            showConfirmButton: false,
                            width: '512px',
                            timer: 4000
                          });
                    },
                    error => {
                        // this.alertService.error('Invalid username or password.');
                        swal.fire({
                            type: 'error',
                            title: 'Wrong Credantials',
                            text: 'Please check your username or password',
                            showConfirmButton: false,
                            width: '512px',
                            timer: 2000
                          });
                          this.recptha.resetImg();
                    });
        }
    }
    doThis() {

        window.location.href = Config.api + '/tweeter_login/';
    }
       doThisFB() {

        window.location.href = Config.api + '/oauth/login/facebook/';
    }
}
