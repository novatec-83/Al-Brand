import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http-service';
import {ActivatedRoute, Router} from '@angular/router';
import {Config} from '../../config';
import {PagerService} from '../_services/paginator.service';
import {Headers, Response, Http} from '@angular/http';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-twitter-list',
    templateUrl: './twitter-list.component.html',
    styleUrls: ['./twitter-list.component.scss']
})
export class TwitterListComponent implements OnInit {
    inflist: any = {};
    main_checkbox;
    max=100;
    influencers;
    user_list = {};
    query;
    sub;
    twitterdata;
    dialogVisible: boolean;
    dialogVisible_features: boolean;
    loaded: any = false;
    loading: boolean = false;
    pager: any = {};
    interests;
    searchQuery;
    list_name;

    constructor(private http: HttpService, private httpNoPreloader: Http, private route: ActivatedRoute, private router: Router, private pagerService: PagerService) {

    }

    ngOnInit() {


        this.setPage(1);


    }

    saveEditable(t) {
        this.loading = true;
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
        headers.append('Content-Type', 'application/json');

        this.httpNoPreloader.put(Config.api + '/ml/update_name_ilist_twitter/', JSON.stringify({
                id: this.searchQuery,
                name: t
            }),
            {headers: headers}).map((response: Response) => response.json()).subscribe(
            data => {
                localStorage.removeItem('selected_list_twitter');
                localStorage.setItem('selected_list_twitter', JSON.stringify({id: this.searchQuery, name: t}));
                this.list_name = t;
                this.loading = false;

            });

    }

    fillinterests(data) {
        this.interests = data

        this.dialogVisible_features = true;
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

            mysvc.put(Config.api + '/ml/update_delete_ilist_twitter/', JSON.stringify({
                    id: this.searchQuery,
                    list: list
                }),
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



        }, (dismiss) => {
            if (dismiss === 'cancel') {
                Swal.fire('Cancelled', '', 'success')
            }
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'

        })

    }

    filltwitterdata(data) {
        // data
        this.twitterdata = data;
        this.dialogVisible = true;
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
        headers.append('Content-Type', 'application/json');
        this.loaded = false;
        this.sub = this.route.params.subscribe(params => {
            if (Number(params['query'])) {
                this.http.get(Config.api + '/ml/get_list_inf_twitter/' + params['query'] + '/?page='+page, {headers: headers}
                    , 'full')
                    .subscribe(res => {
                            this.main_checkbox = false;
                            this.influencers = res.json();
                            this.list_name = res.json().name;
                            this.searchQuery = params['query'];
                            this.loaded = true;
                            this.pager = this.pagerService.getPager(this.influencers['totalItems'], page, 20);

                        },
                        error => {
                            this.router.navigate(['page-not-found']);
                        });
            } else {
                this.router.navigate(['page-not-found']);
            }
        });

    }

    // goTwitterProfile(influencer) {
    //     let url = 'https://twitter.com/' + influencer.screen_name.replace("('", '').replace("',)", '');
    //     Swal({
    //         title: 'You&#39;re Leaving This Site!',
    //         text: 'This is a link to an external site. Click OK to continue to the content (' + url + ').',
    //         // html: true,
    //         confirmButtonColor: '#2ecc71',
    //         showCancelButton: true,
    //
    //     }).then(() => {
    //
    //         window.open(url);
    //
    //
    //     }, (dismiss) => {
    //         // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
    //         if (dismiss === 'cancel') {
    //             // localStorage.removeItem('selected_list_twitter');
    //
    //             Swal(
    //                 'Cancelled',
    //                 '',
    //                 'success'
    //             )
    //         }
    //     });
    // }

    chec() {
        console.clear();
        console.log(this.inflist);

    }

    add_create_list() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
        headers.append('Content-Type', 'application/json');
        this.httpNoPreloader.get(Config.api + '/ml' + '/get_iList_names_twitter/' + currentUser.username + '/-id/', {headers: headers})
            .subscribe(res => {
                for (let li of res.json().results) {
                    this.user_list[li['id']] = li['name'];
                }
            });

        let mysvc = this.http;
        let list = this.inflist;
        let ilist = false;
        let user_list = this.user_list;
        let current_list = JSON.parse(localStorage.getItem('selected_list_twitter'));
        for (let i in list) {
            if (list[i]) {
                ilist = true;
                break;
            }
        }
        if (current_list) {
            Swal.fire(
                {
                    title: 'Add influencers to the list"' + current_list.name + '" or cancel and add to other list?',
                    // text: "List",
                    type: "question",
                    preConfirm: () => {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
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
                    confirmButtonText: 'Add to list"' + current_list.name + '"',

                }
            ).then(() => {


                let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
                headers.append('Content-Type', 'application/json');

                mysvc.put(Config.api + '/ml' + '/create_add_ilist_twitter/', JSON.stringify({
                        id: current_list.id,
                        list: list
                    }),
                    {headers: headers}).map((response: Response) => response.json()).subscribe(
                    data => {

                        localStorage.removeItem('selected_list_twitter');
                        for (let i in this.inflist) {
                            // this.inflist[i['id']] = e;
                            this.inflist[i] = false;

                        }
                        this.main_checkbox = false;
                        // console.log({name: result.value, list: list, username: currentUser.username});
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


            }, (dismiss) => {
                // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                if (dismiss === 'cancel') {
                    localStorage.removeItem('selected_list_twitter');

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

                preConfirm: () => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
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
            }).then(() => {

                Swal.fire({
                    title: 'Enter the name of list',
                    text: 'New list will be created',
                    type: 'question',
                    input: 'text',
                    preConfirm: (result) => {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (result === '') {
                                    reject('List name cannot be empty')
                                } else if (result.length > 30) {
                                    reject('Length of list name cannot be greater than 30')
                                }
                                else {
                                    let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
                                    headers.append('Content-Type', 'application/json');

                                    mysvc.post(Config.api + '' + '/check_ilist_twitter/', JSON.stringify({
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
                }).then((result) => {


                    let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
                    headers.append('Content-Type', 'application/json');

                    mysvc.post(Config.api + '/ml' + '/create_add_ilist_twitter/', JSON.stringify({
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

                }, (dismiss) => {
                    // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                    if (dismiss === 'cancel') {
                        Swal.fire(
                            'Cancelled',
                            'No list created :)',
                            'success'
                        )
                    }
                })

            }, (dismiss) => {
                // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                if (dismiss === 'cancel') {
                    if (ilist) {
                        Swal.fire({
                            input: 'select',
                            confirmButtonText: 'Add',
                            showCancelButton: true,
                            confirmButtonColor: '#00a8ff',
                            cancelButtonColor: '#00a8ff',
                            inputOptions: user_list,
                            inputClass: 'form-control'

                        }).then((result) => {

                            let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
                            headers.append('Content-Type', 'application/json');

                            mysvc.put(Config.api + '/ml' + '/create_add_ilist_twitter/', JSON.stringify({
                                    id: result,
                                    list: list
                                }),
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

                        }, (dismiss) => {
                            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                            if (dismiss === 'cancel') {
                                Swal.fire(
                                    'Cancelled',
                                    'No list Updated :)',
                                    'success'
                                )
                            }
                        })
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

    clear_list() {
        for (let i in this.inflist) {
            this.inflist[i] = false;
        }
    }

    cheakall(e) {

        for (let i of this.influencers['results']) {
            this.inflist[i['id']] = e;
        }
        console.clear();
        console.log(this.inflist)


    }

}
