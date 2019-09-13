import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../services/http-service";
import {Http,Headers} from "@angular/http";
// import {HttpService} from '../serv/http-service';
import {ActivatedRoute} from "@angular/router";
import {PagerService} from "../_services/paginator.service";
import {Config} from "../config";
// import { PagerService } from '../_services/paginator.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-generic-search',
  templateUrl: './generic-search.component.html',
  styleUrls: ['./generic-search.component.scss']
})
export class GenericSearchComponent implements OnInit, OnDestroy {
    private sub: any;
    loaded:boolean = false;
    searchResults;
    private currentUser: any;
    inflist:any ={};
    blogs;
    query;
    feature_data;
    searchQuery;
    blogdata;
    seodata;
    dialogVisible: boolean;
    dialogVisible_features: boolean;
    pager: any = {};
    user_list = {};
    main_checkbox;
    private tempArr: any;
    private responseArr: any;
     p_query: string;
  constructor(private http: HttpService, private httpNoPreloader: Http,private route:ActivatedRoute, private pagerService: PagerService ) { }

  ngOnInit() {


          this.sub = this.route.params.subscribe(params => {
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.searchResults={};
          this.loaded = false;

          let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
          headers.append('Content-Type', 'application/json');
          this.http.get(Config.api+'/ml/global_search/'+ params['query'],{headers:headers})
              .subscribe(res => {

                  this.searchResults = res.json();
                  this.blogs= res.json()['Blogsphere'];
                  for (let item of this.blogs.results){
                      item['rank'] = parseFloat(item['rank']).toFixed(0);
                  }
                  this.p_query =params.query;
                  console.log('Params are', this.p_query);
                  this.tempArr= res.json()['Youtube'];
                  this.searchQuery = params['query'];
                  this.pager = this.pagerService.getPager(this.blogs['totalItems'], 1,10);
                  this.loaded = true;
                  // swal('Hello world!')
              });

      });

  }
  goToLink(url) {
      //let url = 'https://twitter.com/' + influencer.screen_name.replace("('", '').replace("',)", '');
      swal({
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

              swal(
                  'Cancelled',
                  '',
                  'success'
              )
          }
      });
  }
    chec()  {
        console.clear();

    }


    cheakall(e) {

        for (let i of this.blogs['results'])
        {
            this.inflist[i['id']] = e;
        }
        console.clear();


    }


    add_create_list() {
        let currentUser =JSON.parse(localStorage.getItem('currentUser'));
        this.httpNoPreloader.get(Config.api+'/get_iList_names/' + currentUser.username+'/-id/')
            .subscribe(res => {
                // user_list = res.json();
                for (let li of res.json().results) {
                    // let d= li['id']
                    //  li['name']
                    this.user_list[li['id']] = li['name'] ;
                    // user_list.push({})
                }


            });

        let mysvc = this.http;
        let list=this.inflist;
        let ilist = false;
        let user_list =this.user_list;
        let current_list = JSON.parse(localStorage.getItem('selected_list'));
        for (let i in list) {
            if(list[i]) {
                ilist = true;
                // alert('jsdkada');
                break;
            }
        }
        if (current_list) {
            swal(
                {
                    title: 'Add influencers to the list"'+current_list.name+'" or cancel and add to other list?',
                    // text: "List",
                    type: "question",
                    preConfirm:  () => {
                        return new Promise( (resolve, reject)=> {
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
                    // input: "text",
                    showCloseButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Add to list"'+current_list.name+'"',

                }
            ).then( () => {



                let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
                headers.append('Content-Type', 'application/json');

                mysvc.put(Config.api + '/create_add_ilist/', JSON.stringify({id: current_list.id, list: list}),
                    {headers: headers}).map((response: Response) => response.json()).subscribe(
                    data => {

                        localStorage.removeItem('selected_list');
                        for (let i in this.inflist) {
                            // this.inflist[i['id']] = e;
                            this.inflist[i] = false;

                        }
                        this.main_checkbox = false;
                        swal(
                            'List updated!',
                            current_list.name,
                            'success'
                        )
                    },
                    error => {
                        // alert('error')
                        swal(
                            'Try again after some time!',
                            error.toString(),
                            'error'
                        )
                    });


            },  (dismiss)=> {
                // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                if (dismiss === 'cancel') {
                    localStorage.removeItem('selected_list');

                    swal(
                        'Cancelled',
                        'No influencers added :)',
                        'success'
                    )
                }
            });

        }
        else {
            // let currentUser =JSON.parse(localStorage.getItem('currentUser'));
            swal({
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

                swal({
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

                                    mysvc.post(Config.api + '/check_ilist/', JSON.stringify({
                                            name: result,
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

                    mysvc.post(Config.api + '/create_add_ilist/', JSON.stringify({
                            name: result,
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
                            swal(
                                'List created and influencers added!',
                                result,
                                'success'
                            )
                        },
                        error => {
                            swal(
                                'Try again after some time!',
                                error.toString(),
                                'error'
                            )
                        });

                },  (dismiss) => {
                    // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                    if (dismiss === 'cancel') {
                        swal(
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
                        swal({
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

                            mysvc.put(Config.api + '/create_add_ilist/', JSON.stringify({id: result, list: list}),
                                {headers: headers}).map((response: Response) => response.json()).subscribe(
                                data => {
                                    for (let i in this.inflist) {
                                        // this.inflist[i['id']] = e;
                                        this.inflist[i] = false;

                                    }
                                    this.main_checkbox = false;
                                    swal(
                                        'List updated!',
                                        '',
                                        'success'
                                    )
                                },
                                error => {
                                    // alert('error')
                                    swal(
                                        'Try again after some time!',
                                        error.toString(),
                                        'error'
                                    )
                                });

                        } ,  (dismiss) => {
                            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                            if (dismiss === 'cancel') {
                                swal(
                                    'Cancelled',
                                    'No list Updated :)',
                                    'success'
                                )
                            }
                        })
                    } else {
                        swal(
                            'No Influencers selected',
                            '',
                            'warning'
                        )
                    }

                }
            })
        }

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

        this.http.get(Config.api+'/blog/web/' + this.searchQuery + '/?page=' + page + '', null, 'full')
            .subscribe(res => {
                this.main_checkbox = false;
                this.blogs = res.json();



            });

        this.pager = this.pagerService.getPager(this.blogs['totalItems'], page,10);

    }
    navSearch() {

    }

    filldata(b)
    {
        let arr=[];

        for (let obj of b) {

            for (let key in obj) {
                arr.push(obj[key]);
            }

        }
        this.blogdata=arr;
    }
    fillseodata(b) {

        this.seodata=b;
        this.dialogVisible = true;
    }
    fillfeaturedata(b)
    {

        this.feature_data=b;
        this.dialogVisible_features=true;
    }
    ngOnDestroy() {
        this.sub.unsubscribe()
    }
}
