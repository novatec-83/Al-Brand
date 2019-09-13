import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Config } from '../../config';

@Injectable({
  providedIn: 'root'
})export class AuthenticationService {
     currentUser: any;
    image: File;
     username: any;
    constructor(private http: Http) { }

login(username: string, password: string) {
  const headers = new Headers();
      headers.append('Content-Type', 'application/json');
        return this.http.post(Config.api + '/brand_login/',
          JSON.stringify({ username: username, password: password }), {headers: headers})


          .pipe(tap((response: Response) =>{
                            let user = response.json();
                    localStorage.setItem('currentUser', JSON.stringify(user));

          }))
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }


    brand_Signup(username,firstname,lastname,email, password ){
        return this.http.post(Config.api+ '/brand_signup/', {
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        }).pipe(tap((response: Response) => {
            let user_signup = response.json();

                localStorage.setItem('currentUser_Signup', JSON.stringify(user_signup));
        }))
    }

    get_Payment(cardholder,email,packge,amount, cardexpiration,cardcode, cardnumber, category ){
        return this.http.post(Config.api+ '/payment/', {
            cardholder: cardholder,
            email: email,
            package: packge,
            amount: amount,
            cardexpiration: cardexpiration,
            cardcode: cardcode,
            cardnumber: cardnumber,
            category: category,
        })
          .pipe(tap((response: Response) => {

            let data= response.json();

          }))
    }
    get_profile_pic(){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let username =  this.currentUser.username;
        return this.http.get(Config.api+ '/getbrandimage/' + username).map((response: Response) => {
            return response.json();
        });
    }

    // get_profile_pic(){
    //     this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     let username =  this.currentUser.username;
    //     return this.http.get(Config.api+ '/getbrandimage/' + username).pipe(tap((response: Response) => {
    //          response.json();
    //     }))
    // }


    // onUpload(image: File)
    // {
    //     const fd= new FormData();
    //     fd.append('inputfile0', image);
    //     this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     let username =  this.currentUser.username;
    //     return this.http.post(Config.api + '/brandUploadImage/' + username, fd)
    //         .map(res=>{
    //         })
    // }

    onUpload(image:File){
        // const fd= new FormData();
        const fd2= new FormData();
        fd2.append('input_file0',image);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username =  this.currentUser.username;
        fd2.append('username',this.username);

        return this.http.post(Config.api + '/brandUploadImage/',fd2 )
            .pipe(tap(res=>{
                return res;
            }))
    }



    changepassword(username, currentpass, newpass, confirmpass ){
        return this.http.post(Config.api+ '/change_password/', {
            username: username,
            currentPassword: currentpass,
            newPassword: newpass,
            newPassword2: confirmpass,

        }).pipe(tap((response: Response) => {
                let data= response.json();
            }
        ))
    }
}
