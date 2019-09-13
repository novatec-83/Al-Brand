import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})export class DataService {
    private userSource = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    currentUser = this.userSource.asObservable();
    constructor() { }
    changeUserData(data:any) {
        this.userSource.next(data);
    }
}
