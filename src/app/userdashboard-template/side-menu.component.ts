import {Component, OnInit, AfterViewInit} from '@angular/core';
import Swal from  'sweetalert2';
import {HttpService} from "../services/http-service";
import {Router} from "@angular/router";
import {Headers, Response, Http} from '@angular/http';
import {Config} from "../../config";
import {HeaderComponent} from "./header.component";
import {DataService} from "../_services/data.service";

@Component({
    // providers:[],
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, AfterViewInit {
    img;
    currentUser;
    currentUserLoaded: boolean = false;
    rate: '';
    username: string;
    review: string;
    ratingValue: any;
     model: any=[];

    constructor(private http: HttpService, private router: Router,private data: DataService) {
    }

    myUploader(event) {
        //event.files == files to upload
    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.data.currentUser.subscribe(data => this.currentUser = data);
        this.img = 'data:image/png;base64,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';

    this.currentUserLoaded = true;
    }
    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
    ngAfterViewInit() {

    }

    uploadProfileImage(img) {

        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
        headers.append('Content-Type', 'application/json');
        let myhttp = this.http;

        myhttp.post(Config.api + '/upload_brand_profile_image/', {profile_image: img},
            {headers: headers}).map((response: Response) => response.json()).subscribe(
            data => {
                this.currentUser['profile_image'] = Config.api+'/media/'+data['profile_image'];


                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                this.data.changeUserData(this.currentUser);
                Swal.fire(
                    'Image Saved!',
                    '',
                    'success'
                )

            },
            error => {

                Swal.fire(
                    'Try again after some time!',
                    error.toString(),
                    'error'
                )

            });
    }

    getProfileImage() {


        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
        headers.append('Content-Type', 'application/json');
        let myhttp = this.http;
        myhttp.get(Config.api + '/get_brand_profile_image/',
            {headers: headers}).map((response: Response) => response.json()).subscribe(
            data => {
                this.currentUser['profile_image'] = Config.api+'/media/'+data['profile_image'];

                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

            },
            error => {
            })
    }

    processProfileImage() {

        Swal.fire({
            title: 'Select profile image!',
            text: 'New profile image will be uploaded',
            type: 'question',
            //html:'',
            input: 'file',
            inputClass: 'form-control',
            preConfirm: (result) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {

                        if (result == null) {
                            reject('Please select an image')

                        }
                        else {
                            if (result.type.match('image.*')) {
                                resolve();
                            }
                            else {
                                reject('Please select an image')
                            }
                        }
                    }, 2)
                })
            },
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            //
            this.getBase64(result)
            ;

            // }

        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    '',
                    'error'
                )
            }
        })

    }

    getBase64(file) {

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.uploadProfileImage(reader.result)


        };
        reader.onerror = (error) => {

        };

    }

    get(rating) {
        this.rate = rating;

    }

    post_review(){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username= this.currentUser.username;
        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
        return this.http.post(Config.api+'/Brand_Review_Post',{
            'user': this.username,
            'review': this.model.review,
            'rate': this.ratingValue
        },{headers:headers}).map((res:Response)=>{
            res.json();
        }).subscribe(data=>{
            Swal.fire('Thanks for giving', this.ratingValue + ' star rating', 'success');

        })
    }

    onclick(value){
        this.ratingValue = value;

    }


}
