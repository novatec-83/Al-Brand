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
    selector: 'app-pinterest-list-inf',
    templateUrl: './pinterest-list-inf.component.html',
    styleUrls: ['./pinterest-list-inf.component.scss']
})
export class PinterestListInfComponent implements OnInit{
    pager: any= {};
    ptProfiles;
    infList: any = {};
    loading:boolean=false;
    searchQuery;
    loaded = false;
    listName;
    sub;

    constructor( private http: HttpService, private router: Router, private httpNoPreloader: Http, private route: ActivatedRoute, private pagerService: PagerService) {

    }

    ngOnInit(){
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
                this.http.get(Config.api + '/get_list_inf_pt/' + params['query'] + '/?page='+page, {headers: headers}
                    , 'full')
                    .subscribe(res => {
                            // console.log(params['query']);
                            this.searchQuery = params['query'];
                            this.listName= res.json().name;


                            this.ptProfiles = res.json();

                            this.loaded = true;
                            this.pager = this.pagerService.getPager(this.ptProfiles['totalItems'], page, 20);

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

    gotoPin(s: string){

    }


    checkallinfpT(e){
        for(let i of this.ptProfiles['results']){
            this.infList[i['id']]=e
        }
    }
    deleteSelected(){
        let currentUser= JSON.parse(localStorage.getItem('currentUser'));
        let mysvc= this.http;
        let list= this.infList;
        let ilist= false;
        for(let i in list){
            if(list[i]){
                ilist= true;
            }
        }

        Swal.fire({
            title: this.listName,
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
                mysvc.put(Config.api + '/update_delete_ilist_pt/' , JSON.stringify({id: this.searchQuery, list: list}),
                    {headers: headers}).map((response: Response) => response.json()).subscribe(
                    data=>{
                        this.setPage(1);
                        for (let i in this.infList) {
                            // this.inflist[i['id']] = e;
                            this.infList[i] = false;

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

    unckeckedAll(){
        for(let i in this.infList){
            this.infList[i]= false;
        }
    }

    saveEditableList(t){
        this.loading=true;
        let currentUser= JSON.parse(localStorage.getItem('currentUser'));

        let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
        headers.append('Content-Type', 'application/json');

        this.httpNoPreloader.put(Config.api + '/update_name_ilist_md/', JSON.stringify({id: this.searchQuery, name: t}),
            {headers: headers}).map((response: Response) => response.json()).subscribe(
            data =>{
                localStorage.removeItem('selected_list_pt');
                localStorage.setItem('selected_list_pt',JSON.stringify({id: this.searchQuery, name: t}));
                this.listName=t;
                this.loading= false;
            }
        )
    }


}
