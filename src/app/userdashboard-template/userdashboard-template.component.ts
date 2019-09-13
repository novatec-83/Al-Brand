import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http-service';
import Swal from 'sweetalert2';
import {Headers, Response, Http} from '@angular/http';
import {User} from '../_models/index';
import {Config} from '../../config';
import {Router} from '@angular/router';

@Component({
    selector: 'app-userdashboard-template',
    templateUrl: './userdashboard-template.component.html',
    styleUrls: ['./userdashboard-template.component.scss']
})
export class UserdashboardTemplateComponent implements OnInit {
    currentUser: User;
    user_lists;
    user_lists_web;
    selectedIndex;
    current_dashboard: number = 1;
    loaded: boolean = false;
    selected_choice = '-id';
    pint_choices = [
        {code: 'name', name: 'Name - Ascending'},
        {code: '-name', name: 'Name - Descending'},
        {code: '-created_at', name: 'Newest'},
        {code: 'created_at', name: 'Oldest'},
        {code: '-pinterest_influencer', name: 'Number of influencers - DSC'},
        {code: 'pinterest_influencer', name: 'Number of influencers - ASC'},
        // {code: 'AL', name: 'Alabama'},
    ];
    youtube_choices = [
        {code: 'name', name: 'Name - Ascending'},
        {code: '-name', name: 'Name - Descending'},
        {code: '-created_at', name: 'Newest'},
        {code: 'created_at', name: 'Oldest'},
        {code: '-youtube_influencer', name: 'Number of influencers - DSC'},
        {code: 'youtube_influencer', name: 'Number of influencers - ASC'},
        // {code: 'AL', name: 'Alabama'},
    ];
    periscope_choices=[
        {code: 'name', name: 'Name - Ascending'},
        {code: '-name', name: 'Name - Descending'},
        {code: '-created_at', name: 'Newest'},
        {code: 'created_at', name: 'Oldest'},
        {code: '-periscope_influencer', name: 'Number of influencers - DSC'},
        {code: 'periscope_influencer', name: 'Number of influencers - ASC'},
    ];

    medium_choices=[
        {code: 'name', name: 'Name - Ascending'},
        {code: '-name', name: 'Name - Descending'},
        {code: '-created_at', name: 'Newest'},
        {code: 'created_at', name: 'Oldest'},
        {code: '-medium_influencer', name: 'Number of influencers - DSC'},
        {code: 'medium_influencer', name: 'Number of influencers - ASC'},
    ];
    insta_choices = [
        {code: 'name', name: 'Name - Ascending'},
        {code: '-name', name: 'Name - Descending'},
        {code: '-created_at', name: 'Newest'},
        {code: 'created_at', name: 'Oldest'},
        {code: '-instagram_influencer', name: 'Number of influencers - DSC'},
        {code: 'instagram_influencer', name: 'Number of influencers - ASC'},
        // {code: 'AL', name: 'Alabama'},
    ];
    facebook_choices = [
        {code: 'name', name: 'Name - Ascending'},
        {code: '-name', name: 'Name - Descending'},
        {code: '-created_at', name: 'Newest'},
        {code: 'created_at', name: 'Oldest'},
        {code: '-facebook_influencer', name: 'Number of influencers - DSC'},
        {code: 'facebook_influencer', name: 'Number of influencers - ASC'},
        // {code: 'AL', name: 'Alabama'},
    ];
    linkedin_choices = [
        {code: 'name', name: 'Name - Ascending'},
        {code: '-name', name: 'Name - Descending'},
        {code: '-created_at', name: 'Newest'},
        {code: 'created_at', name: 'Oldest'},
        {code: '-linkedin_influencer', name: 'Number of influencers - DSC'},
        {code: 'linkedin_influencer', name: 'Number of influencers - ASC'},
        // {code: 'AL', name: 'Alabama'},
    ];
    blog_choices = [
        {code: 'name', name: 'Name - Ascending'},
        {code: '-name', name: 'Name - Descending'},
        {code: '-created_at', name: 'Newest'},
        {code: 'created_at', name: 'Oldest'},
        {code: '-blog_influencer', name: 'Number of influencers - DSC'},
        {code: 'blog_influencer', name: 'Number of influencers - ASC'},
        // {code: 'AL', name: 'Alabama'},
    ];
    choices_flicker = [
        {code: 'name', name: 'Name - Ascending'},
        {code: '-name', name: 'Name - Descending'},
        {code: '-created_at', name: 'Newest'},
        {code: 'created_at', name: 'Oldest'},
        {code: '-flickr_influencer', name: 'Number of influencers - DSC'},
        {code: 'flickr_influencer', name: 'Number of influencers - ASC'},
        // {code: 'AL', name: 'Alabama'},
    ];
    selected_choice_twitter = '-id';
    choices_twitter = [
        {code: 'name', name: 'Name - Ascending'},
        {code: '-name', name: 'Name - Descending'},
        {code: '-created_at', name: 'Newest'},
        {code: 'created_at', name: 'Oldest'},
        {code: '-twitter_influencer', name: 'Number of influencers - DSC'},
        {code: 'twitter_influencer', name: 'Number of influencers - ASC'},
        // {code: 'AL', name: 'Alabama'},
    ];
    constructor(private http: HttpService, private router: Router) {}

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        this.get_lists(this.selected_choice);
    }

    // Start Dashboard Web all API's Implements by Amjad

            //Function that add influencers in web lists.
    select_add_influencers(id: number, name: string, dashboard) {

        localStorage.setItem('selected_list', JSON.stringify({id: id, name: name}));
        // this.router.navigate(['multi/search'],{queryParams: {name: 'web'}})
        this.router.navigate(['multi/search']);

    }
            // Function that fo to current web lists where you can edit the list.
    go_to_list(e: number, name: string, dashboard) {
        this.router.navigate(['blogs/list/', e])

    }
            //Send Email to Influencer's
    email_list(e: number, name: string, dashboard) {
        // localStorage.setItem('navigated_list',JSON.stringify({id:e,name:name}));
        // if (dashboard === 1) {
        //
        // } else if (dashboard === 2) {
        //     this.router.navigate(['email/settings/', e])
        //
        // } else if (dashboard === 6) {
        this.router.navigate(['email/settings/', e])
        //
        // }
    }
        //Delete any Web list by clicking pencil Icons
    delete_list(id: number) {

        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
        headers.append('Content-Type', 'application/json');
        let myhttp = this.http;
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this list!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(() => {

            myhttp.delete(Config.api + '/delete_ilist/' + id,
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_lists(this.selected_choice);

                    Swal.fire(
                        'List Deleted!',
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
        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'Your list is not deleted :)',
                    'error'
                )
            }
        })


    }

    //Sort Lists of web
    sort_lists() {
        this.get_lists(this.selected_choice);
    }
       // Create New Lists of Web
    create_empty_list() {

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
                            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
                            headers.append('Content-Type', 'application/json');

                            this.http.post(Config.api + '/check_ilist/', JSON.stringify({
                                    name: result.value,
                                    username: this.currentUser.username
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
                }



                )
            },
            showCancelButton: true,
            confirmButtonText: 'Create',
            cancelButtonText: 'Cancel'
        }).then((result) => {

            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');

            this.http.post(Config.api + '/create_add_ilist/', JSON.stringify({
                    name: result.value,
                    list: {},
                    username: this.currentUser.username
                }),
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_lists(this.selected_choice);
                    Swal.fire(
                        'List created!',
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

        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'No list created :)',
                    'success'
                )
            }
        })
    }

                        //Start Twitter all API's Implements by Amjad


    create_empty_list_twitter() {
        // let dashboard = this.current_dashboard;
        //
        // if (dashboard === 1) {
        //     this.create_empty_list()
        // }
        // else if (dashboard === 6) {
        //     this.create_empty_list_dd()
        // }
        // else if (dashboard === 2) {
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
                            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
                            headers.append('Content-Type', 'application/json');

                            this.http.post(Config.api + '/ml/check_ilist_twitter/', JSON.stringify({
                                    name: result.value,
                                    username: this.currentUser.username
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


            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');

            this.http.post(Config.api + '/ml/create_add_ilist_twitter/', JSON.stringify({
                    name: result.value,
                    list: {},
                    username: this.currentUser.username
                }),
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.loadTwitterLists(this.selected_choice_twitter);
                    Swal.fire(
                        'List created!',
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

        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'No list created :)',
                    'success'
                )
            }
        });
    }
    sort_lists_twitter() {

        this.getTwLists(this.selected_choice_twitter);


    }


    sort_lists_peri() {

        this.get_list_peri(this.selected_choice);


    }

    sort_lists_med() {

        this.get_list_med(this.selected_choice);


    }
    sort_lists_fli() {

        this.get_list_flkr(this.selected_choice);


    }

    //Function that add influencers in web lists.
    select_add_influencers_twitter(id: number, name: string) {

        localStorage.setItem('selected_list_twitter', JSON.stringify({id: id, name: name}));
        this.router.navigate(['twitter/search'], {queryParams:{name: 'twitter'}});

    }

    go_to_list_twitter(e: number, name: string) {
        this.router.navigate(['twitter/list/', e])

    }

    email_list_twitter(e: number, name: string) {


    }

    delete_list_twitter(id: number) {
        // let dashboard = this.current_dashboard;
        //
        // if (dashboard === 1) {
        //     this.delete_list(id);
        // } else if (dashboard === 6) {
        //     alert('blgoooooo')
        //     this.delete_list_dd(id);
        // } else if (dashboard === 2) {
        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
        headers.append('Content-Type', 'application/json');
        let myhttp = this.http;
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this list!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(() => {

            myhttp.delete(Config.api + '/ml/delete_ilist_twitter/' + id,
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.loadTwitterLists(this.selected_choice_twitter);

                    Swal.fire(
                        'List Deleted!',
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
        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'Your list is not deleted :)',
                    'error'
                )
            }
        })
    }





    //Start Youtube all API's Implements by Amjad

    email_list_yt(e: number, name: string) {
        // localStorage.setItem('navigated_list',JSON.stringify({id:e,name:name}));
        this.router.navigate(['email/settings/', e])
    }
    delete_list_yt(id: number) {

        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
        headers.append('Content-Type', 'application/json');
        let myhttp = this.http;
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this list!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(() => {

            myhttp.delete(Config.api + '/delete_ilist_yt/' + id,
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_lists_yt(this.selected_choice.replace('blog_influencer', 'youtube_influencer'));

                    Swal.fire(
                        'List Deleted!',
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
        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'Your list is not deleted :)',
                    'error'
                )
            }
        })


    }
    sort_lists_yt() {
        this.get_lists_yt(this.selected_choice.replace('blog_influencer', 'youtube_influencer'));
    }
    create_empty_list_yt() {

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
                            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
                            headers.append('Content-Type', 'application/json');

                            this.http.post(Config.api + '/check_ilist_yt/', JSON.stringify({
                                    name: result.value,
                                    username: this.currentUser.username
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


            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');

            this.http.post(Config.api + '/create_add_ilist_yt/', JSON.stringify({
                    name: result.value,
                    list: {},
                    username: this.currentUser.username
                }),
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_lists_yt(this.selected_choice.replace('blog_influencer', 'youtube_influencer'));
                    Swal.fire(
                        'List created!',
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

        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'No list created :)',
                    'success'
                )
            }
        })
    }
    get_lists_yt(v) {
        this.current_dashboard = 6;
        this.loaded = false;
        this.http.get(Config.api + '/get_iList_names_yt/' + this.currentUser.username + '/' + v + '/', null, 'small')
            .subscribe(res => {
                this.user_lists = res.json();
                this.loaded = true;
            });
    }
    select_add_influencers_yt(id: number, name: string) {

        localStorage.setItem('selected_list_yt', JSON.stringify({id: id, name: name, }));

        this.router.navigate(['youtube/search'], {queryParams:{name: 'youtube'}})

    }
    go_to_list_yt(e: number, name: string) {

        this.router.navigate(['youtube/list/', e])

    }



    //Start Instagram all API's Implements by Amjad
    sort_lists_in() {
        this.get_lists_in(this.selected_choice.replace('blog_influencer', 'instagram_influencer'));
    }
    create_empty_list_in() {

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
                            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
                            headers.append('Content-Type', 'application/json');

                            this.http.post(Config.api + '/check_ilist_in/', JSON.stringify({
                                    name: result.value,
                                    username: this.currentUser.username
                                }),
                                {headers: headers}).map((response: Response) => response.json()).subscribe(
                                data => {
                                    resolve()

                                },
                                error => {
                                    reject('List named "' + result + '" already exists')

                                });
                        }
                    }, 1)
                })
            },
            showCancelButton: true,
            confirmButtonText: 'Create',
            cancelButtonText: 'Cancel'
        }).then((result) => {


            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');

            this.http.post(Config.api + '/create_add_ilist_in/', JSON.stringify({
                    name: result.value,
                    list: {},
                    username: this.currentUser.username
                }),
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_lists_in(this.selected_choice.replace('blog_influencer', 'instagram_influencer'));
                    Swal.fire(
                        'List created!',
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

        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'No list created :)',
                    'success'
                )
            }
        })
    }
    get_lists_in(v) {
        this.loaded = false;
        this.http.get(Config.api + '/get_iList_names_in/' + this.currentUser.username + '/' + v + '/', null, 'small')
            .subscribe(res => {
                this.user_lists = res.json();
                this.loaded = true;
            });
    }
    select_add_influencers_in(id: number, name: string) {
        localStorage.setItem('selected_list_in', JSON.stringify({id: id, name: name}));
        this.router.navigate(['instagram/search'],{queryParams:{name: 'instagram'}})

    }
    select_add_influencers_pt(id: number, name: string){
        localStorage.setItem('selected_list_pt', JSON.stringify({id: id, name: name}));
        this.router.navigate(['/pinterest/search'],{queryParams:{name:'pinterest'}});
    }
    go_to_list_in(e: number, name: string) {

        this.router.navigate(['instagram/list/', e])

    }
    email_list_in(e: number, name: string) {
        // localStorage.setItem('navigated_list',JSON.stringify({id:e,name:name}));
        this.router.navigate(['email/settings/', e])
    }
    delete_list_in(id: number) {

        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
        headers.append('Content-Type', 'application/json');
        let myhttp = this.http;
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this list!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(() => {

            myhttp.delete(Config.api + '/delete_ilist_in/' + id,
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_lists_in(this.selected_choice.replace('blog_influencer', 'instagram_influencer'));

                    Swal.fire(
                        'List Deleted!',
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
        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'Your list is not deleted :)',
                    'error'
                )
            }
        })


    }




    // Start Facebook  all API's Implements by Amjad
    get_lists_fb(v){
        this.loaded=false;
        this.http.get(Config.api + '/get_iLists_names_fb/'+ this.currentUser.username+ '/'+ v+ '/', null, '')
            .subscribe(res=>{
                this.user_lists = res.json();
                this.loaded=true;
            });
    }
    select_add_influencers_fb(id: number, name:string){
        localStorage.setItem('select_list_fb', JSON.stringify({id: id, name: name}));
        this.router.navigate(['facebook/search'], {queryParams: {name:'facebook'}});
    }
    create_empty_list_fb() {

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
                            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
                            headers.append('Content-Type', 'application/json');

                            this.http.post(Config.api + '/check_ilist_fb/', JSON.stringify({
                                    name: result.value,
                                    username: this.currentUser.username
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


            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');

            this.http.post(Config.api + '/create_add_ilist_fb/', JSON.stringify({
                    name: result.value,
                    list: {},
                    username: this.currentUser.username
                }),
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_list_fb(this.selected_choice);
                    Swal.fire(
                        'List created!',
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

        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'No list created :)',
                    'success'
                )
            }
        })
    }
    delete_list_fb(id: number) {
        let headers = new Headers({'Authorization': 'JWT' + this.currentUser['token']}) ;
        headers.append('Content-Type', 'application/json');
        Swal.fire({
            title: 'Are you Sure?',
            text: 'You will not be able to recover this list!',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'

        }).then(() => {
            headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');
            this.http.delete(Config.api + '/delete_ilist_fb/' + id,
                {headers: headers}).map((responce: Response) => responce.json()).subscribe(
                data => {
                    this.get_list_fb(this.selected_choice);
                    Swal.fire(
                        'List Deleted!',
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
                }



            )
        }, function (dismiss) {
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'Your list is not deleted :)',
                    'error'
                )
            }
        })


    }
    go_to_list_fb(e: number, name: string) {

        this.router.navigate(['facebook/list/', e])

    }
    sort_lists_fb(){
        this.get_list_fb(this.selected_choice);
    }
    get_list_fb(v) {
        this.loaded = false;
        this.http.get(Config.api + '/get_iList_names_fb/' + this.currentUser.username + '/' + v + '/', null, 'small')
            .subscribe(res => {
                this.user_lists = res.json(),
                    this.loaded = true;
            })
    }


    // Start Linkedin  all API's Implements by Amjad
    go_to_list_lnkd(e:number, name: string){
        this.router.navigate(['linkedin/list/', e])
    }
    get_list_lnkd(v){
        this.loaded=false;
        this.http.get(Config.api+ '/get_iList_names_ld/'+ this.currentUser.username + '/'+ v + '/', null, 'small')
            .subscribe(res=> {
                this.user_lists= res.json();
                this.loaded=true;
            })
    }
    create_empty_list_lnkd() {

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
                            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
                            headers.append('Content-Type', 'application/json');

                            this.http.post(Config.api + '/check_ilist_ld/', JSON.stringify({
                                    name: result.value,
                                    username: this.currentUser.username
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


            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');

            this.http.post(Config.api + '/create_add_ilist_ld/', JSON.stringify({
                    name: result.value,
                    list: {},
                    username: this.currentUser.username
                }),
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_list_lnkd(this.selected_choice);
                    Swal.fire(
                        'List created!',
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

        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'No list created :)',
                    'success'
                )
            }
        })
    }
    sort_list_lnkd(){
        this.get_list_lnkd(this.selected_choice)
    }
    select_add_influencers_lnkd(id: number, name:string){
        localStorage.setItem('select_list_linkin', JSON.stringify({id: id, name: name}));
        this.router.navigate(['linkedin/search'], {queryParams:{name: 'linkedIn'}})
    }
    delete_ilist_lnkd(id: number) {
        let headers = new Headers({'Authorization': 'JWT' + this.currentUser['token']}) ;
        headers.append('Content-Type', 'application/json');
        Swal.fire({
            title: 'Are you Sure?',
            text: 'You will not be able to recover this list!',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'

        }).then(() => {
            headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');
            this.http.delete(Config.api + '/delete_ilist_ld/' + id,
                {headers: headers}).map((responce: Response) => responce.json()).subscribe(
                data => {
                    this.get_list_lnkd(this.selected_choice);
                    Swal.fire(
                        'List Deleted!',
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
                }



            )
        }, function (dismiss) {
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'Your list is not deleted :)',
                    'error'
                )
            }
        })


    }



    // Start BlogoSphere  all API's Implements by Amjad
    sort_lists_dd() {
        this.get_lists_dd(this.selected_choice);
    }
    create_empty_list_dd() {

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
                            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
                            headers.append('Content-Type', 'application/json');

                            this.http.post(Config.api + '/check_ilist_dd/', JSON.stringify({
                                    name: result.value,
                                    username: this.currentUser.username
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


            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');

            this.http.post(Config.api + '/create_add_ilist_dd/', JSON.stringify({
                    name: result.value,
                    list: {},
                    username: this.currentUser.username
                }),
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_lists_dd(this.selected_choice);
                    Swal.fire(
                        'List created!',
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

        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'No list created :)',
                    'success'
                )
            }
        })
    }
    get_lists_dd(v) {
        this.current_dashboard = 6;
        this.loaded = false;
        this.http.get(Config.api + '/get_iList_names_dd/' + this.currentUser.username + '/' + v + '/', null, 'small')
            .subscribe(res => {
                this.user_lists = res.json();
                this.loaded = true;
            });
    }
    select_add_influencers_dd(id: number, name: string) {
        localStorage.setItem('selected_list_dd', JSON.stringify({id: id, name: name}));
        this.router.navigate(['blogosphere/search'],{queryParams: {name: 'blog'}})


    }
    go_to_list_dd(e: number, name: string) {

        this.router.navigate(['blogosphere/list/', e])

    }
    email_list_dd(e: number, name: string) {
        // localStorage.setItem('navigated_list',JSON.stringify({id:e,name:name}));
        this.router.navigate(['email/settings/', e])
    }
    delete_list_dd(id: number) {

        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
        headers.append('Content-Type', 'application/json');
        let myhttp = this.http;
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this list!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(() => {

            myhttp.delete(Config.api + '/delete_ilist_dd/' + id,
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_lists_dd(this.selected_choice);

                    Swal.fire(
                        'List Deleted!',
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
        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'Your list is not deleted :)',
                    'error'
                )
            }
        })


    }
    get_lists(v) {

        this.loaded = false;
        this.http.get(Config.api + '/get_iList_names/' + this.currentUser.username + '/' + v + '/', null, 'small')
            .subscribe(res => {
                this.user_lists = res.json();
                this.user_lists_web = res.json().results;
                this.loaded = true;
            });


    }


    // Start Pinterests  all API's Implements by Amjad
    sort_list_pt(){
        this.get_list_pinterest(this.selected_choice)
    }
    delete_ilist_pt(id: number) {
        let headers = new Headers({'Authorization': 'JWT' + this.currentUser['token']}) ;
        headers.append('Content-Type', 'application/json');
        Swal.fire({
            title: 'Are you Sure?',
            text: 'You will not be able to recover this list!',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'

        }).then(() => {
            headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');
            this.http.delete(Config.api + '/delete_ilist_pt/' + id,
                {headers: headers}).map((responce: Response) => responce.json()).subscribe(
                data => {
                    this.get_list_pinterest(this.selected_choice);
                    Swal.fire(
                        'List Deleted!',
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
                }



            )
        }, function (dismiss) {
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'Your list is not deleted :)',
                    'error'
                )
            }
        })


    }


    delete_ilist_peri(id: number) {
        let headers = new Headers({'Authorization': 'JWT' + this.currentUser['token']}) ;
        headers.append('Content-Type', 'application/json');
        Swal.fire({
            title: 'Are you Sure?',
            text: 'You will not be able to recover this list!',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'

        }).then(() => {
            headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');
            this.http.delete(Config.api + '/delete_ilist_periscope/' + id,
                {headers: headers}).map((responce: Response) => responce.json()).subscribe(
                data => {
                    this.get_list_peri(this.selected_choice);
                    Swal.fire(
                        'List Deleted!',
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
                }



            )
        }, function (dismiss) {
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'Your list is not deleted :)',
                    'error'
                )
            }
        })


    }
    delete_ilist_med(id: number) {
        let headers = new Headers({'Authorization': 'JWT' + this.currentUser['token']}) ;
        headers.append('Content-Type', 'application/json');
        Swal.fire({
            title: 'Are you Sure?',
            text: 'You will not be able to recover this list!',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'

        }).then(() => {
            headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');
            this.http.delete(Config.api + '/delete_ilist_md/' + id,
                {headers: headers}).map((responce: Response) => responce.json()).subscribe(
                data => {
                    this.get_list_med(this.selected_choice);
                    Swal.fire(
                        'List Deleted!',
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
                }



            )
        }, function (dismiss) {
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'Your list is not deleted :)',
                    'error'
                )
            }
        })


    }

    go_to_list_pt(e: number, name: string){
        this.router.navigate(['pinterest/list/', e])
    }

    go_to_list_peri(e: number, name: string){
        this.router.navigate(['periscope/list/', e])
    }

    go_to_list_med(e: number, name: string){
        this.router.navigate(['medium/list/', e])
    }
    go_to_list_flkr(e: number, name: string){
        this.router.navigate(['flickr/list/', e])
    }
    select_add_influencers_peri(id: number, name: string){
        localStorage.setItem('selected_list_peri', JSON.stringify({id: id, name: name}));
        this.router.navigate(['/periscope/search'],{queryParams:{name:'periscope'}});
    }

    select_add_influencers_med(id: number, name: string){
        localStorage.setItem('selected_list_med', JSON.stringify({id: id, name: name}));
        this.router.navigate(['/medium/search'],{queryParams:{name:'medium'}});
    }
    select_add_influencers_flkr(id: number, name: string){
        localStorage.setItem('selected_list_fl', JSON.stringify({id: id, name: name}));
        this.router.navigate(['/flickr/search'],{queryParams:{name:'flickr'}});
    }
    create_empty_list_pt() {

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
                            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
                            headers.append('Content-Type', 'application/json');

                            this.http.post(Config.api + '/check_ilist_pt/', JSON.stringify({
                                    name: result.value,
                                    username: this.currentUser.username
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


            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');

            this.http.post(Config.api + '/create_add_ilist_pt/', JSON.stringify({
                    name: result.value,
                    list: {},
                    username: this.currentUser.username
                }),
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_list_pinterest(this.selected_choice);
                    Swal.fire(
                        'List created!',
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

        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'No list created :)',
                    'success'
                )
            }
        })
    }
    // get_list_pinterest(v) {
    //     this.loaded=false;
    //     this.http.get(Config.api + '/get_iList_names_pt/'+ this.currentUser.username+ '/'+ v + '/', null, 'samll')
    //         .subscribe(res=> {
    //             this.user_lists= res.json();
    //             this.loaded= true;
    //         })
    // }

    get_list_pinterest(v) {

        this.loaded = false;
        this.http.get(Config.api + '/get_iList_names_pt/' + this.currentUser.username + '/' + v + '/', null, 'small')
            .subscribe(res => {
                this.user_lists = res.json();
                this.loaded = true;
            });


    }

    delete_ilist_flkr(id: number) {
        let headers = new Headers({'Authorization': 'JWT' + this.currentUser['token']});
        headers.append('Content-Type', 'application/json');
        Swal.fire({
            title: 'Are you Sure?',
            text: 'You will not be able to recover this list!',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'

        }).then(() => {
            headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');
            this.http.delete(Config.api + '/delete_ilist_fl/' + id,
                {headers: headers}).map((responce: Response) => responce.json()).subscribe(
                data => {
                    this.get_list_flkr(this.selected_choice);
                    Swal.fire(
                        'List Deleted!',
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
                }
            )
        }, function (dismiss) {
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'Your list is not deleted :)',
                    'error'
                )
            }
        })

    }


        get_list_med(v) {

        this.loaded = false;
        this.http.get(Config.api + '/get_iList_names_md/' + this.currentUser.username + '/' + v + '/', null, 'small')
            .subscribe(res => {
                this.user_lists = res.json();
                this.loaded = true;
            });


    }
    get_list_flkr(v) {

        this.loaded = false;
        this.http.get(Config.api + '/get_iList_names_fl/' + this.currentUser.username + '/' + v + '/', null, 'small')
            .subscribe(res => {
                this.user_lists = res.json();
                this.loaded = true;
            });


    }



    get_list_peri(v) {

        this.loaded = false;
        this.http.get(Config.api + '/get_iList_names_periscope/' + this.currentUser.username + '/' + v + '/', null, 'small')
            .subscribe(res => {
                this.user_lists = res.json();
                this.loaded = true;
            });


    }


                //Others Functions
    loadTwitterLists(v) {
        // this.current_dashboard = 2;
        this.getTwLists(v);
        // this.load_all_lists(v, this.current_dashboard);

    }
    getTwLists(v) {
        this.current_dashboard = 2;
        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
        headers.append('Content-Type', 'application/json');
        this.loaded = false;
        this.http.get(Config.api + '/ml/get_iList_names_twitter/' + this.currentUser.username + '/' + v + '/', {headers: headers}, 'small')
            .subscribe(res => {
                this.user_lists = res.json();
                this.loaded = true;
            });
    }
    selectedIndexChange(e) {
        if (e === 0) {
            this.get_lists('-id')
        } else if (e === 1) {
            this.loadTwitterLists('-id');
        } else if (e === 2) {
            this.get_lists_dd('-id');

        } else if (e === 3) {
            this.get_lists_yt('-id');

        } else if (e === 4) {
            this.get_lists_in('-id');
        } else if (e === 5 ) {
            this.get_list_fb('-id');
        }
        else if(e===6){
            this.get_list_lnkd('-id');
        }
        else if(e===7){
            this.get_list_pinterest('-id');
        }
        else if(e===8){
            this.get_list_peri('-id');
        }

        else if(e===9){
            this.get_list_med('-id');
        }
        else if(e===10){
            this.get_list_flkr('-id');
        }
    }
    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    create_empty_list_peri() {

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
                            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
                            headers.append('Content-Type', 'application/json');

                            this.http.post(Config.api + '/check_ilist_periscope/', JSON.stringify({
                                    name: result.value,
                                    username: this.currentUser.username
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


            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');

            this.http.post(Config.api + '/create_add_ilist_periscope/', JSON.stringify({
                    name: result.value,
                    list: {},
                    username: this.currentUser.username
                }),
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_list_peri(this.selected_choice);
                    Swal.fire(
                        'List created!',
                        result.value,
                        'success'
                    );
                  console.log('Result is..................', result.value);
                },
                error => {
                    Swal.fire(
                        'Try again after some time!',
                        error.toString(),
                        'error'
                    )
                });

        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'No list created :)',
                    'success'
                )
            }
        })
    }
    create_empty_list_med() {

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
                            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
                            headers.append('Content-Type', 'application/json');

                            this.http.post(Config.api + '/check_ilist_md/', JSON.stringify({
                                    name: result.value,
                                    username: this.currentUser.username
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


            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');

            this.http.post(Config.api + '/create_add_ilist_md/', JSON.stringify({
                    name: result.value,
                    list: {},
                    username: this.currentUser.username
                }),
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_list_med(this.selected_choice);
                    Swal.fire(
                        'List created!',
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

        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'No list created :)',
                    'success'
                )
            }
        })
    }
    create_empty_list_flkr() {

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
                            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
                            headers.append('Content-Type', 'application/json');

                            this.http.post(Config.api + '/check_ilist_fl/', JSON.stringify({
                                    name: result.value,
                                    username: this.currentUser.username
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


            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');

            this.http.post(Config.api + '/create_add_ilist_fl/', JSON.stringify({
                    name: result.value,
                    list: {},
                    username: this.currentUser.username
                }),
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_list_flkr(this.selected_choice);
                    Swal.fire(
                        'List created!',
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

        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                Swal.fire(
                    'Cancelled',
                    'No list created :)',
                    'success'
                )
            }
        })
    }



}
