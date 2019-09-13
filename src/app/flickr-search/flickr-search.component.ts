import { Component, OnInit } from '@angular/core';
import {Headers, Response} from '@angular/http';
import {Config} from '../../config';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';
import {HttpService} from '../services/http-service';
import {ActivatedRoute} from '@angular/router';
import {PagerService} from '../_services/paginator.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-flickr-search',
  templateUrl: './flickr-search.component.html',
  styleUrls: ['./flickr-search.component.css'],
    providers: []
})
export class FlickrSearchComponent implements OnInit {
    influencers_by_default_FB: any=[];
    items: any={};
    currentList;
    column = {};
    selectedCategory;
    title;
    location;
    model: any={};
    ER;
    myControl: FormControl = new FormControl();
    main_checkbox;
    fbinfluencers;
    likes;
    perfomance;
    locationArray:any=[];
    max= 100;
    location_value: string = "";
    inCurrentpage: boolean= false;
    checklistname:boolean = false;
    currentUser;
    filteredOptions: Observable<string[]>;
    item;
    inflist:any ={};
    query;
    loaded=false;
    pager: any = {};
    pdfArray: any=[];
    inf_list: string ='Influencers List';
    pageSize = '15';
    user_list = {};
    currentlist: any;
    options;
    selected_category;
    constructor(private http: HttpService,
                private route: ActivatedRoute,  private pagerService: PagerService) {

    }

  ngOnInit() {

          this.get_default_Flickr_Users(1);

      this.currentUser =JSON.parse(localStorage.getItem('currentUser'));


      let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
      headers.append('Content-Type', 'application/json');

      this.http.get(Config.api + '/ml/get_flickr_categories')
          .subscribe(res => {

              this.options = res.json();
              console.log('optionsssss', this.options);

              this.filteredOptions = this.myControl.valueChanges
                  .startWith(null)
                  .map(val => val ? this.filterCategory(val) : this.options.slice());
          });



      this.http.get(Config.api + '/get_iList_names_fl/' + this.currentUser.username + '/-id/')
          .subscribe(res => {
              for (let li of res.json().results) {
                  this.user_list[li['id']] = li['name'];
                  this.checklistname = true;
              }


          });

  }
    getCatName(e){
        // console.log('EEEEEEEVVVVVVEEENNNTTTT',e)
        this.selected_category= e.value;
        console.log('This Slected Categry',this.selected_category);
    }
    filterCategory(val: string): string[] {
        return this.options.filter(option =>
            option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }
    getFlickrData(e){
        this.selected_category= e['option']['value'];
        this.pager= {};
        this.setPage(1);

    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
        this.loaded = false;
        headers.append('Content-Type', 'application/json');
        this.http.post(Config.api+'/ml/get_flickr_users/' + this.selected_category + '/?page=' + page + '', {
            title: this.title,
            location: this.location,
            like:this.likes,
            performance:this.perfomance,
            ER:this.ER
        },{headers:headers})
            .subscribe(res => {
                this.main_checkbox = false;
                this.fbinfluencers = res.json();
                console.log('FB Influencers are...',this.fbinfluencers);
                this.pager = this.pagerService.getPager(this.fbinfluencers['totalItems'], page,10);
                this.loaded = true;

            });


    }
    checkedAll(e){

        for(let i of this.fbinfluencers['results'])
        {
            this.inflist[i['id']]= e;
            console.log('Selected Lists Event is', e);

        }

    }
    checkedAllDef(e){

        for(let i of this.influencers_by_default_FB['results'])
        {
            this.inflist[i['id']]= e;
            console.log('Selected Lists Event is', e);

        }

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

    get_default_Flickr_Users(page: number){

        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.http.get(Config.api+'/ml/get_flickr_influencers_list'  + '/?page=' + page)
            .subscribe(res => {
                // this.main_checkbox = false;
                this.influencers_by_default_FB = res.json();
                this.pdfArray= this.influencers_by_default_FB['results'];
                for(let obj of this.pdfArray){
                    this.locationArray= obj['category']['location'];
                    console.log('Array after loop',this.locationArray);
                }

                this.pager = this.pagerService.getPager(this.influencers_by_default_FB['totalItems'], page,10);

            });
    }

    add_create_list() {
        let currentUser =this.currentUser;


        let mysvc = this.http;
        let list=this.inflist;
        let ilist = false;
        let user_list =this.user_list;
        let current_list = JSON.parse(localStorage.getItem('selected_list_fl'));
        for (let i in list) {
            if(list[i]) {
                ilist = true;
                break;
            }
        }
        if (current_list) {
            Swal.fire(
                {
                    title: 'Add influencers to the list"'+current_list.name+'" or cancel and add to other list?',
                    type: "question",
                    preConfirm:  () => {
                        return new Promise( (resolve, reject)=> {
                            setTimeout( () => {
                                if (ilist) {
                                    resolve()
                                } else {
                                    reject('No influencers selected')
                                }
                            }, 1)
                        })
                    },
                    // input: "text",
                    showCloseButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Add to list"'+current_list.name+'"',

                }
            ).then( () => {
                let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
                headers.append('Content-Type', 'application/json');

                mysvc.put(Config.api + '/create_add_ilist_fl/', JSON.stringify({id: current_list.id, list: list}),
                    {headers: headers}).map((response: Response) => response.json()).subscribe(
                    data => {

                        localStorage.removeItem('selected_list_fl');
                        for (let i in this.inflist) {
                            // this.inflist[i['id']] = e;
                            this.inflist[i] = false;

                        }
                        this.main_checkbox = false;
                        Swal.fire(
                            'List updated!',
                            current_list.name,
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


            },  (dismiss)=> {
                // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                if (dismiss === 'cancel') {
                    localStorage.removeItem('selected_list_fl');

                    Swal.fire(
                        'Cancelled',
                        'No influencers added :)',
                        'success'
                    )
                }
            });

        }
        else {
            // let currentUser =JSON.parse(localStorage.getItem('currentUser'));
            Swal.fire({
                title: "Create new or add existing list of influencers?",
                // text: "List",
                type: "question",
                // input: "text",
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: 'Create new list',
                cancelButtonText: 'Add to existing list',

                preConfirm:  () => {
                    return new Promise( (resolve, reject) => {
                        setTimeout( () => {
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
                confirmButtonColor: '#00a8ff',
                cancelButtonColor: '#00a8ff',
                // closeOnConfirm: false,
                // inputPlaceholder: "Write something"
            }).then( () => {

                Swal.fire({
                    title: 'Enter the name of list',
                    text: 'New list will be created',
                    type: 'question',
                    input: 'text',
                    preConfirm:  (result) => {
                        return new Promise( (resolve, reject) => {
                            setTimeout( () => {
                                if (result === '') {
                                    reject('List name cannot be empty')
                                } else if (result.length > 30) {
                                    reject('Length of list name cannot be greater than 30')
                                }
                                else {
                                    let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
                                    headers.append('Content-Type', 'application/json');

                                    mysvc.post(Config.api + '/check_ilist_fl/', JSON.stringify({
                                            name: result.value,
                                            username: currentUser.username
                                        }),
                                        {headers: headers}).map((response: Response) => response.json()).subscribe(
                                        data => {
                                            resolve()

                                        },
                                        error => {
                                            reject('List named "' + result + '" already exists')

                                        });
                                }
                            }, 2)
                        })
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Create',
                    cancelButtonText: 'Cancel'
                }).then( (result) => {


                    let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
                    headers.append('Content-Type', 'application/json');

                    mysvc.post(Config.api + '/create_add_ilist_fl/', JSON.stringify({
                            name: result.value,
                            list: list,
                            username: currentUser.username
                        }),
                        {headers: headers}).map((response: Response) => response.json()).subscribe(
                        data => {
                            for (let i in this.inflist) {
                                // this.inflist[i['id']] = e;
                                this.inflist[i] = false;

                            }
                            this.main_checkbox = false;
                            Swal.fire(
                                'List created and influencers added!',
                                result.value(),
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

                },  (dismiss) => {
                    // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                    if (dismiss === 'cancel') {
                        Swal.fire(
                            'Cancelled',
                            'No list created :)',
                            'success'
                        )
                    }
                })

            },  (dismiss) => {
                // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                if (dismiss === 'cancel') {
                    if (ilist) {
                        if(this.checklistname){
                            Swal.fire({
                                input: 'select',
                                confirmButtonText: 'Add',
                                showCancelButton: true,
                                confirmButtonColor: '#00a8ff',
                                cancelButtonColor: '#00a8ff',
                                inputOptions: user_list,
                                inputClass: 'form-control'

                            }).then( (result) => {

                                let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
                                headers.append('Content-Type', 'application/json');

                                mysvc.put(Config.api + '/create_add_ilist_fl/', JSON.stringify({id: result, list: list}),
                                    {headers: headers}).map((response: Response) => response.json()).subscribe(
                                    data => {
                                        console.log({name: result.value, list: list, username: currentUser.username});
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

                            } ,  (dismiss) => {
                                // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                                if (dismiss === 'cancel') {
                                    Swal.fire(
                                        'Cancelled',
                                        'No list Updated :)',
                                        'success'
                                    )
                                }
                            })} else {
                            Swal.fire(
                                'No List created yet!',
                                '',
                                'warning'
                            )
                        }
                    } else {
                        Swal.fire(
                            'No Influencers selected',
                            '',
                            'warning'
                        )
                    }

                }
            })
        }

    }
}
