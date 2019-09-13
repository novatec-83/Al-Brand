import { Injectable } from '@angular/core';
import { RequestOptions, Response, Headers } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Config} from '../../config';
import {Http} from '@angular/http';
import { User } from '../_models';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(Config.api+'/users/', this.jwt()).pipe(tap((response: Response) => {
          return response.json();
        }))
    }

    getByUsername(id: string) {
        return this.http.get(Config.api+'/users/' + id, this.jwt()).pipe(tap((response: Response) => {
          return response.json();
        }))
    }

    getUserTweets(username: string) {
        return this.http.get(Config.api+'/gettweets/' + username+'/', this.jwt()).pipe(tap((response: Response) => {
          return response.json();
        }))
    }
    create(user: User) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      let headers = new Headers();
      if (currentUser && currentUser.token) {
        headers = new Headers({ 'Authorization': 'JWT ' + currentUser.token });
      }

      headers.append('Content-Type', 'application/json');

      return this.http.post(Config.api+'/users/', JSON.stringify(user),
        {headers: headers}).pipe(tap((response: Response) => {
        return response.json();
      }))
    }

  update(user: User) {
    return this.http.put(Config.api+'/users/'
      + user.id, user, this.jwt()).pipe(tap((response: Response) => {
      return response.json();
    }))
  }

    delete(id: number) {
        return this.http.delete(Config.api+'/users/' + id, this.jwt()).pipe(tap((response: Response) => {
          return response.json();
        }))
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            const headers = new Headers({ 'Authorization': 'JWT ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
