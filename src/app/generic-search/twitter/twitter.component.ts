import {Component, Input, OnInit} from '@angular/core';
// import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http-service';
import {ActivatedRoute} from '@angular/router';
import {Config} from '../../config';
import {PagerService} from '../../_services/paginator.service';

import {Headers, Response, Http} from '@angular/http';
import swal from 'sweetalert2';
import {Observable} from "rxjs/Observable";
import {FormControl} from "@angular/forms";
@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.scss']
})
export class TwitterComponent implements OnInit {
    currentUser;
    // scoreValues;
    max=100;
    scoreValues: number[] = [1, 100];
    myControl: FormControl = new FormControl();
    // search:string;
    column = {};
    inflist: any = {};
    main_checkbox;
    influencers;
    interest_value: string = "";
    loc: string = "";
    name_value: string = "";
    user_list = {};
    query;
    sub;
    twitterdata;
    dialogVisible: boolean;
    dialogVisible_features: boolean;
    loaded: any = false;
    pager: any = {};
    interests;
    //options = ["Abortion Service", "Academic Camp", "Accessories", "Accessories Store", "Accountant", "Actor", "Actor/director", "Acupuncturist", "Addiction Resources Center", "Addiction Service", "Addiction Treatment Center", "Adoption Service", "Adult Entertainment Service", "Advertising Agency", "Advertising/Marketing", "Advertising/Marketing Service", "Aerospace Company", "Aerospace/defense", "Afghani Restaurant", "African Restaurant", "Agricultural Cooperative", "Agricultural Service", "Agriculture", "Agriculture Company", "AIDS Resource Center", "Aircraft Dealership", "Airline Company", "Airline Industry Service", "Airport", "Airport Lounge", "Airport Shuttle Service", "Airport Terminal", "Album", "Alcohol Addiction Treatment Center", "Allergist", "Alternative & Holistic Health Service", "Amateur sports team", "Amateur Sport Team", "American Restaurant", "Amusement Center", "Amusement & Theme Park", "Andhra Restaurant", "Anesthesiologists", "Anglican Church", "Animal", "Animal breed", "Animal Shelter", "Antique Store", "Apartment & Condo Building", "Apostolic Church", "Apparel", "Apparel & Clothing", "Apparel Company", "Apparel Distributor", "Appliance Manufacturer", "Appliance Repair Service", "Appliances", "App page", "Aquarium", "Aquatic Pet Store", "Arabian Restaurant", "Arcade", "Archaeological Service", "Archery Range", "Archery Shop", "Architect", "Architectural Designer", "Architectural Engineer", "Argentinian Restaurant", "Armed Forces", "Armenian Restaurant", "Aromatherapy Service", "Art", "Art Gallery", "Artist", "Art Museum", "Art Restoration Service", "Art School", "Arts & Crafts Store", "Arts & Entertainment", "Arts/entertainment/nightlife", "Arts/humanities website", "Arts & Humanities Website", "Art Tour Agency", "Asian Fusion Restaurant", "Asian Restaurant", "Astrologist", "Astrologist & Psychic", "Athlete", "Attractions/things to do", "ATV Dealership", "ATV Recreation Park", "ATV Rental", "ATV Rental Shop", "Auction House", "Audiologist", "Audio Visual Equipment Store", "Auditorium", "Australian Restaurant", "Austrian Restaurant", "Author", "Auto Detailing Service", "Automation Service", "Automobiles and parts", "Automotive", "Automotive, Aircraft & Boat", "Automotive, Aircraft, Boat", "Automotive Body Shop", "Automotive Company", "Automotive Consultant", "Automotive Customization Shop", "Automotive Dealership", "Automotive Glass Service", "Automotive Leasing Service", "Automotive Manufacturer", "Automotive Parts Store", "Automotive Repair Shop", "Automotive Restoration Service", "Automotive Service", "Automotive Shipping Service", "Automotive Storage Facility", "Automotive Store", "Automotive Wholesaler", "Automotive Window Tinting Service", "Aviation", "Aviation School", "Awning Supplier", "Baby & Children's Clothing Store", "Baby Goods/Kids Goods", "Babysitter", "Bags/luggage", "Bags & Luggage Company", "Bags & Luggage Store", "Bail Bondsmen", "Bakery", "Ballroom", "Band", "Bank", "Bank Equipment & Service", "Bank/financial institution", "Bank/Financial Service", "Bank/financial services", "Bankruptcy Lawyer", "Baptist Church", "Bar", "Barbecue Restaurant", "Barber Shop", "Bar & Grill", "Bartending School", "Bartending Service", "Baseball Field", "Basketball Court", "Basque Restaurant", "Batting Cage", "Bavarian Restaurant", "Beach", "Beach Resort", "Beauty", "Beauty, Cosmetic & Personal Care", "Beauty/Cosmetics Company", "Beauty Salon", "Beauty Service", "Beauty Store", "Beauty Supplier", "Beauty Supply Store", "Bed and Breakfast", "Beer Bar", "Beer Garden", "Belgian Restaurant", "Bengali/Bangladeshi Restaurant", "Betting Shop", "Bicycle Rental Shop", "Bicycle Repair Service", "Bicycle Shop", "Big Box Retailer", "Bike Rental", "Bike Trail", "Bingo Hall", "Biotechnology", "Biotechnology Company", "Blacksmith", "Blinds & Curtains Store", "Blogger", "Blood Bank", "Board game", "Boat Dealership", "Boat/Ferry Company", "Boat Rental", "Boat / Sailing Instructor", "Boat Service", "Boat Tour Agency", "Book", "Book & Magazine Distributor", "Book series", "Books & Magazines", "Bookstore", "Book Store", "Borough", "Botanical Garden", "Bottled Water Company", "Bottled Water Supplier", "Boutique Store", "Bowling Alley", "Brand", "Brand Agency", "Brand/Company Type", "Brazilian Restaurant", "Breakfast & Brunch Restaurant", "Brewery", "Bridal Shop", "Bridge", "British Restaurant", "Broadcasting & Media Production Company", "Brokerage", "Brokerage Firm", "Bubble Tea Shop", "Buddhist Temple", "Buffet Restaurant", "Building Materials", "Building Material Store", "Burger Restaurant", "Burmese Restaurant", "Business", "Business Center", "Business Consultant", "Business/economy website", "Business & Economy Website", "Business person", "Business Service", "Business services", "Business Supply Service", "Bus Line", "Bus Station", "Bus Tour Agency", "Butcher Shop", "Cabin", "Cabinet & Countertop Store", "Cable & Satellite Company", "Cafe", "Cafeteria", "Cajun & Creole Restaurant", "Calabrian Restaurant", "Cambodian Restaurant", "Camera/photo", "Camera Store", "Campground", "Campus Building", "Canadian Restaurant", "Canal", "Candy Store", "Canoe & Kayak Rental", "Canoe & Kayak Rental Shop", "Cantonese Restaurant", "Car Dealership", "Cardiologist", "Career Counselor", "Cargo & Freight Company", "Caribbean Restaurant", "Car Rental", "Car Stereo Store", "Car Wash"];
    selected_category;
    locEm;
    sort_by: string = '-score';
    private tweets_value: string;
    @Input('params_query') params_query:string;
    @Input('load_influencers') load_influencers;
    @Input('twitter_results') twitter_results;
   get_results;
    constructor(private http: HttpService, private httpNoPreloader: Http, private route: ActivatedRoute, private pagerService: PagerService) {

    }

    ngOnInit() {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.influencers = this.load_influencers;
      this.get_results= this.twitter_results;
        // this.pager = this.pagerService.getPager(this.influencers['totalItems'], 1, 10);
        this.scoreValues = [this.influencers['min'], this.influencers['max']];
        // this.pager = this.pagerService.getPager(this.get_results['totalItems'], 1, 10);
        this.loaded = true;

        this.setPage(1);

    }


    getTWInfluencersPress(e) {
        if (e.keyCode == 13) {
            this.pager = {};
            this.interest_value = "";
            this.loc = "";
            this.name_value = "";
            this.column = {};
            // alert( this.selected_category)
            // this.selected_category = e['option']['value'];

            this.setPage(1);
        }
    }

    getTWInfluencers(e) {
        this.pager = {};
        this.interest_value = "";
        this.loc = "";
        this.name_value = "";

        // this.search = "all";
        this.column = {};
        this.setPage(1, true);
    }

    fillinterests(data) {

        this.interests = data;
        console.log('Interests are .......',this.interests);
        console.log('Interests data is...............',data);
        // if(!this.interests['infscore']['interests']) {
        //     this.interests['infscore']['interests'][0] = this.selected_category;
        // }

        this.dialogVisible_features = true;
    }

    searchByLocEm(e) {
        if (e.keyCode == 13 && this.locEm) {
            this.setPage(1);

        }
    }

    filltwitterdata(data) {
        // data
        this.twitterdata = data;
        this.dialogVisible = true;
    }

    setPage(page: number, doornot: boolean = false) {
        if (page < 1 || page > this.pager.totalPages) {
            // alert('called')
            return;
        }
            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
            // this.loaded = false;
            headers.append('Content-Type', 'application/json');
            this.http.post(Config.api + '/ml/get_twitter_users/' + this.params_query + '/?page=' + page,  {headers: headers})
                .subscribe(res => {
                            this.get_results= res.json();
                        this.pager = this.pagerService.getPager(this.get_results['totalItems'], page, 10);
                        this.loaded = true;
                    }
                )

    }

    custom_filter(v) {
        console.clear();
        console.log(v.target.value);
        if (v.keyCode == 13 && this.name_value !== "") {
            // this.column = "name";
            this.column["name"] = v.target.value;
            // this.column["name"] = v.target.value;
            this.setPage(1);

        }
    }
    filter_tweets(v) {
        console.clear();
        console.log(v.target.value);
        if (v.keyCode == 13 && this.tweets_value !== "") {
            // this.column = "name";
            this.column["tweets_value"] = v.target.value;
            // this.column["name"] = v.target.value;
            this.setPage(1);

        }
    }

    interest_filter(v) {
        console.clear();
        console.log(v.target.value);
        if (v.keyCode == 13 && this.interest_value !== "") {
            // this.column = "name";
            this.column["interest"] = v.target.value;
            // this.column["name"] = v.target.value;
            this.setPage(1);

        }
    }

    filter_loc_email(v) {
        if (v.keyCode == 13 && this.loc !== "") {
            // this.column = "name";
            this.column["location"] = v.target.value;
            // this.column["name"] = v.target.value;
            this.setPage(1);

        }
    }

    filter_score(v) {
        console.clear();
        console.log(this.scoreValues);
        this.column["score"] = this.scoreValues;
        // this.column["name"] = v.target.value;
        this.setPage(1);
        // if (v.keyCode == 13) {
        //     // this.column = "name";
        //     this.column["location"] = v.target.value;
        //     // this.column["name"] = v.target.value;
        //     this.setPage(1);
        //
        // }
    }

    sortByInfluence(e) {
        console.clear()
        console.log(e)
        if (e['order'] === 1) {
            if (this.sort_by === 'score') {
                return;
            }
            this.sort_by = 'score'
            this.setPage(this.pager.currentPage);
        }
        else {
            if (this.sort_by === '-score') {
                return;
            }
            this.sort_by = '-score'
            this.setPage(this.pager.currentPage);
        }
    }

    sortByName(e) {

        console.clear()
        console.log(e)
        if (e['order'] === 1) {
            if (this.sort_by === 'name') {
                return;
            }
            this.sort_by = 'name'
            this.setPage(this.pager.currentPage);
        }
        else {
            if (this.sort_by === '-name') {
                return;
            }
            this.sort_by = '-name'
            this.setPage(this.pager.currentPage);
        }
    }

    sortByLoc(e) {

        console.clear()
        console.log(e)
        if (e['order'] === 1) {
            if (this.sort_by === 'location') {
                return;
            }
            this.sort_by = 'location'
            this.setPage(this.pager.currentPage);
        }
        else {
            if (this.sort_by === '-location') {
                return;
            }
            this.sort_by = '-location'
            this.setPage(this.pager.currentPage);
        }
    }

    goTwitterProfile(influencer) {
        let url =  influencer;
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
                // user_list = res.json();
                // console.log(res.json())

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
                // alert('jsdkada');
                break;
            }
        }
        if (current_list) {
            swal(
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
                        // console.log({name: result, list: list, username: currentUser.username});
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


            }, (dismiss) => {
                // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                if (dismiss === 'cancel') {
                    localStorage.removeItem('selected_list_twitter');

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

                swal({
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

                                    mysvc.post(Config.api + '/ml' + '/check_ilist_twitter/', JSON.stringify({
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
                }).then((result) => {


                    let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
                    headers.append('Content-Type', 'application/json');

                    mysvc.post(Config.api + '/ml' + '/create_add_ilist_twitter/', JSON.stringify({
                            name: result,
                            list: list,
                            username: currentUser.username
                        }),
                        {headers: headers}).map((response: Response) => response.json()).subscribe(
                        data => {
                            console.log({name: result, list: list, username: currentUser.username});
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

                }, (dismiss) => {
                    // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                    if (dismiss === 'cancel') {
                        swal(
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
                        swal({
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
                                    console.log({name: result, list: list, username: currentUser.username});
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

                        }, (dismiss) => {
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

    cheakall(e) {
        // console.log(e)

        for (let i of this.influencers) {
            this.inflist[i['id']] = e;
        }
        console.clear();
        console.log(this.inflist)


    }

}
