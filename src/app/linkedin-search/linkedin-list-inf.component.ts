import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http-service';
import {Headers, Http, Response} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map'
import {Config} from '../../config';
import {PagerService} from '../_services/paginator.service';
import Swal from "sweetalert2";


@Component({
    selector: 'app-linkedin-list-inf',
    templateUrl: './linkedin-list-inf.component.html',
    styleUrls: ['./linkedin-list-inf.component.scss']
})
export class LinkedinListInfComponent implements OnInit {

    inflist: any = {};
    loading:boolean=false;
    pager: any={};
    searchquery;
    loaded = false;
    listname;
    lnkdProfiles;
    sub;
    constructor(private http: HttpService, private router: Router,private httpNoPreloader: Http, private route: ActivatedRoute, private pagerService: PagerService) {

    }

    ngOnInit() {
        this.setPage(1);
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
                this.http.get(Config.api + '/get_list_inf_ld/' + params['query'] + '/?page='+page, {headers: headers}
                    , 'full')
                    .subscribe(res => {
                            // console.log(params['query']);
                            this.searchquery = params['query'];
                            this.listname = res.json().name;


                            this.lnkdProfiles = res.json();

                            this.loaded = true;
                            this.pager = this.pagerService.getPager(this.lnkdProfiles['totalItems'], page, 20);

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

    saveEditableList(t){
                this.loading=true;
                let currentUser= JSON.parse(localStorage.getItem('currentUser'));

        let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
        headers.append('Content-Type', 'application/json');

        this.httpNoPreloader.put(Config.api + '/update_name_ilist_ld/', JSON.stringify({id: this.searchquery, name: t}),
            {headers: headers}).map((response: Response) => response.json()).subscribe(
                data =>{
                    localStorage.removeItem('select_list_linkin');
                    localStorage.setItem('select_list_linkin',JSON.stringify({id: this.searchquery, name: t}));
                    this.listname=t;
                    this.loading= false;
                }
        )
    }

    myHandleError(){
        Swal.fire(
            'List name length should be between 1 and 30!',
            '',
            'error'
        )
    }
    checkAllInfluencers(e){
        for(let i of this.lnkdProfiles['results']){
            this.inflist[i['id']]= e
        }
    }
    clearSelected(){
        for(let i in this.inflist){
            this.inflist[i]= false;
        }
    }
    deleteSelected(){

        let currentUser= JSON.parse(localStorage.getItem('currentUser'));
        let mysvc= this.http;
        let list= this.inflist;
        let ilist=false;

        for(let i in list){
            if(list[i]){
                ilist= true;
                break;
            }
        }
        Swal.fire({
            title: this.listname,
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
                  mysvc.put(Config.api + '/update_delete_ilist_ld/' , JSON.stringify({id: this.searchquery, list: list}),
                      {headers: headers}).map((response: Response) => response.json()).subscribe(
                          data=>{
                              this.setPage(1);
                              for (let i in this.inflist) {
                                  // this.inflist[i['id']] = e;
                                  this.inflist[i] = false;

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
    } //functionCompleted

    gotolnkdProfile(){

    }

}
