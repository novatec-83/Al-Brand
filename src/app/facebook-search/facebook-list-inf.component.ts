import {Component, OnInit} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Config} from '../../config';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../services/http-service';
import {PagerService} from '../_services/paginator.service';
import Swal from 'sweetalert2';

@Component({
    selector:'app-facebook-list-inf',
    templateUrl:'./facebook-list-inf.component.html',
    styleUrls:['./facebook-list-inf.component.scss'],
    providers: []
})
export class FacebookListInfComponent implements OnInit{

    inf_list: any = {};
    fb_Influencers;
    query;
    sub;
    searchQuery;
    loaded = false;
    pager: any = {};
    list_name;
    subjectFormControl = new FormControl('', [
        Validators.required,
    ]);
    messageFormControl = new FormControl('', [
        Validators.required]);
    loading:boolean=false;
     currentUser;
    body;
    subject;
    password;
     triggered_email;
     influencers_by_default_FB;

    constructor(
                private http: HttpService, private router: Router,
                private httpNoPreloader: Http, private route: ActivatedRoute, private pagerService: PagerService) {}
    ngOnInit(){
        this.setPage(1);
        this.currentUser =JSON.parse(localStorage.getItem('currentUser'));
        this.password= localStorage.getItem('currentPassword');
    }
    getEmail(e){
        this.triggered_email=e.email;
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.loaded=false;
        this.sub = this.route.params.subscribe(params => {
            if (Number(params['query'])) {
                let currentUser = JSON.parse(localStorage.getItem('currentUser'));

                let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
                headers.append('Content-Type', 'application/json');
                this.http.get(Config.api + '/get_list_inf_fb/' + params['query'] + '/?page='+page, {headers: headers}
                    , 'full')
                    .subscribe(res => {
                            this.searchQuery = params['query'];
                            this.list_name = res.json().name;
                            this.fb_Influencers = res.json();
                            this.loaded = true;
                            this.pager = this.pagerService.getPager(this.fb_Influencers['totalItems'], page, 20);

                        },
                        error => {
                            this.router.navigate(['page-not-found']);
                        });
            } else {
                this.router.navigate(['page-not-found']);
            }
        });
    }


    sendEmail(){

        this.http.post(Config.api+'/email_from_brand/'  , {
            username: this.currentUser.username,
            email: this.triggered_email,
            message: this.body,
            subject: this.subject,
            password: this.password
        })
            .subscribe(res => {

                this.influencers_by_default_FB = res.json();


            });

    }
    saveEditablefb(t){
        this.loading = true;
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
        headers.append('Content-Type', 'application/json');

        this.httpNoPreloader.put(Config.api + '/update_name_ilist_fb/', JSON.stringify({id: this.searchQuery, name: t}),
            {headers: headers}).map((response: Response) => response.json()).subscribe(
            data => {
                localStorage.removeItem('select_list_fb');
                localStorage.setItem('select_list_fb',JSON.stringify({id:this.searchQuery, name:t}));
                this.list_name=t;
                this.loading = false;

            });

    }

    myHandleError(){
        Swal.fire(
            'List name length should be between 1 and 30!',
            '',
            'error'
        )
    }
    deleteSelected_fb(){

        let currentUser= JSON.parse(localStorage.getItem('currentUser'));
        let mysvc= this.http;
        let list= this.inf_list;
        let ilist=false;

        for(let i in list){
            if(list[i]){
                ilist= true;
                break;
            }
        }
        Swal.fire({
            title: this.list_name,
            text: 'Selected influencers in this list will be deleted!',
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Update',
            preConfirm: function () {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        if(list){
                            resolve()
                        }
                        else {
                            reject('No Influencers Selected')
                        }

                    }, 1) //timeOutEnd

                }) //endPromise

            }, //preconfirm
            cancelButtonText: 'Cancel',

            //Swal
        }).then(()=>{
            let headers= new Headers({'Authorization': 'JWT ' + currentUser['token']});
            headers.append('Content-Type', 'application/json');
            mysvc.put(Config.api + '/update_delete_ilist_fb/' , JSON.stringify({id: this.searchQuery, list: list}),
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data=>{
                    this.setPage(1);
                    for (let i in this.inf_list) {
                        // this.inflist[i['id']] = e;
                        this.inf_list[i] = false;

                    }
                    Swal.fire(
                        'List updated!',
                        '',
                        'success'
                    )
                },
                error1 => {
                    Swal.fire( 'Try again after some time!', error1.toString(), 'error' )}
            )
        }, (dismiss)=>{
            if(dismiss === 'cancel'){
                Swal.fire('Cancelled', '', 'error')
            }
        })
    }

    checkedAll(e){
        for(let i of this.fb_Influencers['results']){
            this.inf_list[i['id']]= e;
        }
    }

}
