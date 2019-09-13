import { Component, OnInit } from '@angular/core';
import {HttpService} from '../services/http-service';
import {ActivatedRoute, Router} from '@angular/router';
import {Headers, Http, Response} from '@angular/http';
import {Config} from '../../config';
import {PagerService} from '../_services/paginator.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-flickr-list-inf',
  templateUrl: './flickr-list-inf.component.html',
  styleUrls: ['./flickr-list-inf.component.css'],
    providers:[]
})
export class FlickrListInfComponent implements OnInit {
    inf_list: any = {};
    fb_Influencers;
    query;
    sub;
    feature_data;
    searchQuery;
    loaded = false;
    blogdata;
    seodata;
    dialogVisible: boolean;
    dialogVisible_features: boolean;
    pager: any = {};
    main_checkbox;
    list_name;
    loading:boolean=false;

    constructor(
                private http: HttpService, private router: Router,
                private httpNoPreloader: Http, private route: ActivatedRoute, private pagerService: PagerService) {}

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
                this.http.get(Config.api + '/get_list_inf_fl/' + params['query'] + '/?page='+page, {headers: headers}
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

  ngOnInit() {
      this.setPage(1);
  }

    deleteSelected(){
        let currentUser= JSON.parse(localStorage.getItem('currentUser'));
        let mysvc= this.http;
        let list= this.inf_list;
        let ilist= false;
        for(let i in list){
            if(list[i]){
                ilist= true;
            }
        }

        Swal.fire({
            title: this.list_name,
            type: 'question',
            text: 'Selected Influencers will be deleted',
            showCancelButton: true,
            confirmButtonText: 'Update',
            preConfirm: function () {
                return new Promise(function (resolve, reject) {
                    setTimeout( function () {

                        if (list){
                            resolve();
                        }
                        else {
                            reject('No Influencer Selected')
                        }

                    }, 1)

                });
            },

            cancelButtonText: 'Cancel'
        }).then(()=>{
                let headers= new Headers({'Authorization': 'JWT ' + currentUser['token']});
                headers.append('Content-Type', 'application/json');
                mysvc.put(Config.api + '/update_delete_ilist_fl/' , JSON.stringify({id: this.searchQuery, list: list}),
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
            }
        )


    } //deleteSelected() End


}
