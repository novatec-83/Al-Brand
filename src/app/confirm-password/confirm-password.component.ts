import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {HttpService} from '../services/http-service';
import {Headers, Response, Http} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/map'
import {Config} from '../../config';
// import { SweetAlertService } from 'angular-sweetalert-service';
import {PagerService} from '../_services/paginator.service';
import Swal from 'sweetalert2';
import {runInThisContext} from "vm";
import {Observable} from "rxjs/Observable";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-confirm-password',
    templateUrl: './confirm-password.component.html',
    styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent  {


}
