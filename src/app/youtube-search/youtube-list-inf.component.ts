import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {HttpService} from '../services/http-service';
import {Headers, Response, Http} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map'
import {Config} from '../../config';
import {PagerService} from '../_services/paginator.service';
import Swal from 'sweetalert2';
import {runInThisContext} from "vm";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-youtube-list-inf',
    templateUrl: './youtube-list-inf.component.html',
    styleUrls: ['./youtube-list-inf.component.scss']
})
export class YoutubeListInfComponent implements OnInit, AfterViewInit, OnDestroy {

    inflist: any = {};
    blogs;
    query;
    sub;
    feature_data;
    searchQuery;
    loaded = false;
    blogdata;
    downloadJsonHref: any= {};
    seodata;
    dialogVisible: boolean;
    dialogVisible_features: boolean;
    pager: any = {};
    pdfJSON: any={};
    main_checkbox;
    list_name;
    loading:boolean=false;
    constructor(
                private sanitizer: DomSanitizer,
                private http: HttpService, private router: Router,private httpNoPreloader: Http, private route: ActivatedRoute, private pagerService: PagerService) {

    }

    ngAfterViewInit() {
    }

    ngOnInit() {

        this.setPage(1);
    }


    saveEditable(t){
        this.loading = true;
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
        headers.append('Content-Type', 'application/json');

        this.httpNoPreloader.put(Config.api + '/update_name_ilist_yt/', JSON.stringify({id: this.searchQuery, name: t}),
            {headers: headers}).map((response: Response) => response.json()).subscribe(
            data => {
                localStorage.removeItem('selected_list_yt');
                localStorage.setItem('selected_list_yt',JSON.stringify({id:this.searchQuery, name:t}));
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
    chec() {
        console.clear();
    }

    goToLink(url) {
        //let url = 'https://twitter.com/' + influencer.screen_name.replace("('", '').replace("',)", '');
        Swal.fire({
            title: 'You&#39;re Leaving This Site!',
            text: 'This is a link to an external site. Click OK to continue to the content (' + url + ').',
            // html: true,
            confirmButtonColor: '#2ecc71',
            showCancelButton: true,

        }).then(() => {

            window.open(url);


        }, (dismiss) => {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                // localStorage.removeItem('selected_list_twitter');

                Swal.fire(
                    'Cancelled',
                    '',
                    'success'
                )
            }
        });
    }
    cheakall(e) {

        for (let i of this.blogs['results']) {
            this.inflist[i['id']] = e;
        }
        console.clear();


    }


    update_delete_list() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let mysvc = this.http;
        let list = this.inflist;
        let ilist = false;

        for (let i in list) {
            if (list[i]) {
                ilist = true;
                // alert('jsdkada');
                break;
            }
        }

        Swal.fire({
            title: this.list_name,
            text: 'Selected influencers will be deleted!',
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Update',
            preConfirm: function () {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        if (ilist) {
                            resolve()
                        } else {
                            reject('No influencers selected')
                        }
                        // else if(result.length>30) {
                        //     reject('Length of list name cannot be greater than 30')
                        // }
                        // resolve()
                    }, 1)
                })
            },
            cancelButtonText: 'Cancel'
        }).then(() => {


            let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
            headers.append('Content-Type', 'application/json');

            mysvc.put(Config.api + '/update_delete_ilist_yt/', JSON.stringify({id: this.searchQuery, list: list}),
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.setPage(1);
                    for (let i in this.inflist) {
                        // this.inflist[i['id']] = e;
                        this.inflist[i] = false;

                    }
                    this.main_checkbox = false;
                    Swal.fire(
                        'List updated!',
                        '',
                        'success'
                    )
                },
                error => {
                    // alert('error')
                    Swal.fire(
                        'Try again after some time!',
                        error.toString(),
                        'error'
                    )
                });


        },  (dismiss) => {
            if (dismiss === 'cancel') {
                Swal.fire('Cancelled', '', 'success')
            }
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'

        })

    }

    clear_list() {
        for (let i in this.inflist) {
            this.inflist[i] = false;
        }
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
                this.http.get(Config.api + '/get_list_inf_yt/' + params['query'] + '/?page='+page, {headers: headers}
                    , 'full')
                    .subscribe(res => {
                            this.searchQuery = params['query'];
                            this.list_name = res.json().name;


                            this.blogs = res.json();

                            this.loaded = true;
                            this.pager = this.pagerService.getPager(this.blogs['totalItems'], page, 20);

                            // this.setPage(1);
                            // Swal('Hello world!')
                        },
                        error => {
                            // alert('error')
                            this.router.navigate(['page-not-found']);

                        });
            } else {
                this.router.navigate(['page-not-found']);
            }

        });


    }

    navSearch() {

    }

    filldata(b) {
        let arr = [];
        for (let obj of b) {
            for (let key in obj) {
                arr.push(obj[key]);
            }

        }
        this.blogdata = arr;
    }

    fillseodata(b) {
        this.seodata = b;
        this.dialogVisible = true;
    }

    fillfeaturedata(b) {
        this.feature_data = b;
        this.dialogVisible_features = true;
    }
    ngOnDestroy() {
        // localStorage.removeItem('navigated_list');
        this.sub.unsubscribe();

    }


}
