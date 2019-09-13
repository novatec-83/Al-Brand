import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
// import {GoogleAuthService} from "ng-gapi/lib/GoogleAuthService";
// import {GoogleApiService} from "ng-gapi/lib/GoogleApiService";
// import GoogleUser = gapi.auth2.GoogleUser;
// import GoogleAuth = gapi.auth2.GoogleAuth;
import {Headers, Response, Http} from '@angular/http';
import {HttpService} from '../services/http-service';
import { Select2OptionData } from 'ng2-select2';
import * as _ from "lodash";
import {ActivatedRoute, Router} from "@angular/router";
import {Config} from '../config';
import swal from 'sweetalert2';
import {FormControl, Validators} from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// import {win} from "@angular/platform-browser/src/browser/tools/browser";
@Component({
    selector: 'app-email-settings',
    templateUrl: './email-settings.component.html',
    styleUrls: ['./email-settings.component.css']
})
export class EmailSettingsComponent implements OnInit, OnDestroy {

    public exampleData: Array<Select2OptionData>;
    public options: Select2Options;
    public value: string[];
    public current: string[];
    SubjectMessage;
    selectedemail={};
    notexist:boolean = false;
    commemails;
    EmailMessage:any = '';
    more_email;
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)]);
    list_id;
    // public static readonly SESSION_STORAGE_KEY: string = "accessToken";
    // private user: GoogleUser = undefined;
    sub: any;
    emailadded:boolean = false;
    shownothing :boolean = false;
    constructor(
        // private googleAuthService: GoogleAuthService,
        //         private ngZone: NgZone, gapiService: GoogleApiService,
                private http: HttpService, private route: ActivatedRoute, private router: Router,) {
        this.sub = this.route.queryParams.subscribe(params => {
            console.log(params);
            // let id = params['username'];
            let code = params['code'];
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));

            let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
            headers.append('Content-Type', 'application/json');

            http.get(Config.api + '/get_comm_email/',
                {headers: headers}).subscribe(
                data => {
                    this.commemails = data.json();
                    // console.log('yeh dekho'+data);
                    if(!this.commemails) {
                        this.notexist=true;
                    }

                },
                error => {
                    console.log('this one is right'+ error.json())
                    if(error.json()['msg']==='notexist') {
                        this.notexist=true;
                    }

                });
            console.log(code);
        });

        try {
            this.sub = this.route.queryParams.subscribe(params => {
                console.log(params);
                // let id = params['username'];
                let code = params['code'];
                if(code) {
                    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

                    let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
                    headers.append('Content-Type', 'application/json');

                    http.post(Config.api + '/add_comm_email/', JSON.stringify({code: params['code']}),
                        {headers: headers}).subscribe(
                        data => {
                            this.commemails = data.json();
                            console.log(data.json())
                            this.emailadded = true;
                        },
                        error => {
                            console.clear()
                            console.log(error.json());
                            if(error.json()['msg']==='notexist'){
                                swal(
                                    'Email already associated with another account!',
                                    '',
                                    'error'
                                ).then(() => {
                                    if (this.list_id) {
                                        router.navigate(['email/settings',this.list_id])
                                    } else {
                                        router.navigate(['email/settings']);
                                    }

                                })
                            } else if(error.json()['msg']==='unable') {
                                swal(
                                    'Unable to authenticate or email already added!',
                                    '',
                                    'error'
                                ).then(() => {
                                    if (this.list_id) {
                                        router.navigate(['email/settings',this.list_id])
                                    } else {
                                        router.navigate(['email/settings']);
                                    }

                                })
                            }
                            else {
                                if (this.list_id) {
                                    router.navigate(['email/settings',this.list_id])
                                } else {
                                    router.navigate(['email/settings']);
                                }
                            }

                            // alert('error')
                            //

                        });
                    console.log(code);
                }
            })
        }
        catch (e) {

        }


    }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            if (Number(params['id'])) {
                let currentUser = JSON.parse(localStorage.getItem('currentUser'));
                this.list_id = params['id'];
                let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
                headers.append('Content-Type', 'application/json');
                this.http.get(Config.api + '/get_list_emails/' + params['id'] + '/', {headers: headers}
                    , 'full')
                    .subscribe(res => {
                        let arr = [];
                        let arr1 = [];

                           for(let item of res.json()) {
                               arr.push({ id: item['email'],
                                   text: item['email']});
                               arr1.push(item['email']);

                           }
                           this.exampleData = arr;
                           console.log(arr1)
                           this.value =arr1;
                            this.current=arr1;
                            // swal('Hello world!')
                        },
                        error => {
                            // alert('error')
                            this.router.navigate(['page-not-found']);

                        });

            } else {
                console.log('fazool mei')
                this.shownothing=true;
            }

        });
        // this.exampleData = [
        //     {
        //         id: 'multiple1',
        //         text: 'umardino@gmail.com'
        //     },
        //     {
        //         id: 'multiple2',
        //         text: 'Multiple 2'
        //     },
        //     {
        //         id: 'multiple3',
        //         text: 'Multiple 3'
        //     },
        //     {
        //         id: 'multiple4',
        //         text: 'Multiple 4'
        //     }
        // ];
        //
        // this.value = ['multiple2', 'multiple4'];

        this.options = {
            multiple: true
        }

        // this.current = this.value.join(' | ');
    }

    changed(data: {value: string[]}) {
        console.log(this.exampleData);
        this.current = data.value;
        console.log(this.current);
    }
    add_recipient() {
        let arr = [];
        let arr1 = [];
        let exists:boolean = false;
        for(let item of this.current) {
            if(this.more_email===item) {
                exists = true;
            }
            arr.push({ id: item,
                text: item});
            arr1.push(item);

        }
        if(!exists) {
            arr.push({ id: this.more_email,
                text: this.more_email})
            arr1.push(this.more_email);
            this.exampleData = arr;
            // console.log(arr1)
            this.value =arr1;
            this.current=arr1;
        }
        // this.exampleData.push({ id: this.more_email,
        //     text: this.more_email});
        // this.value.push(this.more_email);
        // console.log(this.exampleData)
        // this.more_email='';
    }

    checkMsg() {
        console.log(this.selectedemail);
        if(!this.selectedemail['email']){
            swal(
                'Please select an email first!',
                '',
                'error'
            )
        } else if (!this.SubjectMessage) {
            swal(
                'Please write subject of email',
                '',
                'error'
            )
        }
        else if (!this.EmailMessage) {
            swal(
                'Please write email message',
                '',
                'error'
            )
        }
        else {
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));

            let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
            headers.append('Content-Type', 'application/json');

            this.http.post(Config.api + '/send_comm_email/', JSON.stringify({
                    sender: this.selectedemail['email'],
                    recipients: this.current,
                    EmailMessage: this.EmailMessage,
                    SubjectMessage: this.SubjectMessage
                }),
                {headers: headers}).subscribe(
                data => {
                    swal(
                        'Email Sent Successfully',
                        '',
                        'success'
                    )
                },
                error => {
                    // alert('error')
                    // router.navigate(['email/settings']);
                    swal(
                        'Email not sent!',
                        'Please try again after some time',
                        'error'
                    )
                });
        }
    }
    static signInBtn() {


        window.location.href =
            'https://accounts.google.com/o/oauth2/auth?client_id=239235840914-cre9qjca03jvsm4v5hv89kh8r42k22mj.apps.googleusercontent.com&redirect_uri=http://localhost:4200/email/settings&scope=https://www.googleapis.com/auth/gmail.modify+https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&access_type=offline&response_type=code&approval_prompt=force&user_id=umarbilalmqsd@gmail.com&state=';
    }

    // this.signIn();

        // gapi.client.gmail.users.labels.list({
        //     'userId': 'me'
        // }).then(function(response) {
        //     var labels = response.result.labels;
        //     appendPre('Labels:');
        //
        //     if (labels && labels.length > 0) {
        //         for (i = 0; i < labels.length; i++) {
        //             var label = labels[i];
        //             appendPre(label.name)
        //         }
        //     } else {
        //         appendPre('No Labels found.');
        //     }
        // });

    // }
    //
    // public setUser(user: GoogleUser): void {
    //     this.user = user;
    // }
    //
    // public getCurrentUser(): GoogleUser {
    //     return this.user;
    // }

    // public getToken(): string {
    //     let token: string = sessionStorage.getItem(EmailSettingsComponent.SESSION_STORAGE_KEY);
    //     if (!token) {
    //         throw new Error("no token set , authentication required");
    //     }
    //     return sessionStorage.getItem(EmailSettingsComponent.SESSION_STORAGE_KEY);
    // }

    // public signIn() {
    //     this.googleAuthService.getAuth().subscribe((auth) => {
    //         auth.signIn().then(res => this.signInSuccessHandler(res), err => this.signInErrorHandler(err));
    //     });
    // }
    //
    // //TODO: Rework
    // public signOut(): void {
    //     this.googleAuthService.getAuth().subscribe((auth) => {
    //         try {
    //             auth.signOut();
    //         } catch (e) {
    //             console.error(e);
    //         }
    //         sessionStorage.removeItem(EmailSettingsComponent.SESSION_STORAGE_KEY)
    //     });
    // }

    // public isUserSignedIn(): boolean {
    //     return !_.isEmpty(sessionStorage.getItem(EmailSettingsComponent.SESSION_STORAGE_KEY));
    // }
    //
    // private signInSuccessHandler(res: GoogleUser) {
    //     this.ngZone.run(() => {
    //         this.user = res;
    //         sessionStorage.setItem(
    //             EmailSettingsComponent.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
    //         );
    //         console.log(this.user);
    //         console.log(res.getAuthResponse(true));
    //     });
    // }
    //
    // private signInErrorHandler(err) {
    //     console.warn(err);
    // }
    ngOnDestroy() {
        // localStorage.removeItem('navigated_list');
        this.sub.unsubscribe();

    }

}
