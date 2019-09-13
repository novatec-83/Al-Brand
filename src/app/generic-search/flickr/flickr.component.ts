import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpService} from '../../services/http-service';
import {Headers, Http, Response} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import {PagerService} from '../../_services/paginator.service';
import {Observable} from 'rxjs/Observable';
import {Config} from '../../config';
import swal from "sweetalert2";

@Component({
  selector: 'app-flickr',
  templateUrl: './flickr.component.html',
  styleUrls: ['./flickr.component.css']
})
export class FlickrComponent implements OnInit {
    myControl: FormControl = new FormControl();

    inflist:any ={};
    max:number=100;
    influencers;
    query;
    @Input('params_query') params_query:string;
    @Input('load_influencers') load_influencers;

    loaded=false;
    checklistname:boolean = false;

    pager: any = {};
    user_list = {};
    main_checkbox;
    currentUser;
    selected_category;
    options = ["Abortion Service", "Academic Camp", "Accessories", "Accessories Store", "Accountant", "Actor", "Actor/director", "Acupuncturist", "Addiction Resources Center", "Addiction Service", "Addiction Treatment Center", "Adoption Service", "Adult Entertainment Service", "Advertising Agency", "Advertising/Marketing", "Advertising/Marketing Service", "Aerospace Company", "Aerospace/defense", "Afghani Restaurant", "African Restaurant", "Agricultural Cooperative", "Agricultural Service", "Agriculture", "Agriculture Company", "AIDS Resource Center", "Aircraft Dealership", "Airline Company", "Airline Industry Service", "Airport", "Airport Lounge", "Airport Shuttle Service", "Airport Terminal", "Album", "Alcohol Addiction Treatment Center", "Allergist", "Alternative & Holistic Health Service", "Amateur sports team", "Amateur Sport Team", "American Restaurant", "Amusement Center", "Amusement & Theme Park", "Andhra Restaurant", "Anesthesiologists", "Anglican Church", "Animal", "Animal breed", "Animal Shelter", "Antique Store", "Apartment & Condo Building", "Apostolic Church", "Apparel", "Apparel & Clothing", "Apparel Company", "Apparel Distributor", "Appliance Manufacturer", "Appliance Repair Service", "Appliances", "App page", "Aquarium", "Aquatic Pet Store", "Arabian Restaurant", "Arcade", "Archaeological Service", "Archery Range", "Archery Shop", "Architect", "Architectural Designer", "Architectural Engineer", "Argentinian Restaurant", "Armed Forces", "Armenian Restaurant", "Aromatherapy Service", "Art", "Art Gallery", "Artist", "Art Museum", "Art Restoration Service", "Art School", "Arts & Crafts Store", "Arts & Entertainment", "Arts/entertainment/nightlife", "Arts/humanities website", "Arts & Humanities Website", "Art Tour Agency", "Asian Fusion Restaurant", "Asian Restaurant", "Astrologist", "Astrologist & Psychic", "Athlete", "Attractions/things to do", "ATV Dealership", "ATV Recreation Park", "ATV Rental", "ATV Rental Shop", "Auction House", "Audiologist", "Audio Visual Equipment Store", "Auditorium", "Australian Restaurant", "Austrian Restaurant", "Author", "Auto Detailing Service", "Automation Service", "Automobiles and parts", "Automotive", "Automotive, Aircraft & Boat", "Automotive, Aircraft, Boat", "Automotive Body Shop", "Automotive Company", "Automotive Consultant", "Automotive Customization Shop", "Automotive Dealership", "Automotive Glass Service", "Automotive Leasing Service", "Automotive Manufacturer", "Automotive Parts Store", "Automotive Repair Shop", "Automotive Restoration Service", "Automotive Service", "Automotive Shipping Service", "Automotive Storage Facility", "Automotive Store", "Automotive Wholesaler", "Automotive Window Tinting Service", "Aviation", "Aviation School", "Awning Supplier", "Baby & Children's Clothing Store", "Baby Goods/Kids Goods", "Babysitter", "Bags/luggage", "Bags & Luggage Company", "Bags & Luggage Store", "Bail Bondsmen", "Bakery", "Ballroom", "Band", "Bank", "Bank Equipment & Service", "Bank/financial institution", "Bank/Financial Service", "Bank/financial services", "Bankruptcy Lawyer", "Baptist Church", "Bar", "Barbecue Restaurant", "Barber Shop", "Bar & Grill", "Bartending School", "Bartending Service", "Baseball Field", "Basketball Court", "Basque Restaurant", "Batting Cage", "Bavarian Restaurant", "Beach", "Beach Resort", "Beauty", "Beauty, Cosmetic & Personal Care", "Beauty/Cosmetics Company", "Beauty Salon", "Beauty Service", "Beauty Store", "Beauty Supplier", "Beauty Supply Store", "Bed and Breakfast", "Beer Bar", "Beer Garden", "Belgian Restaurant", "Bengali/Bangladeshi Restaurant", "Betting Shop", "Bicycle Rental Shop", "Bicycle Repair Service", "Bicycle Shop", "Big Box Retailer", "Bike Rental", "Bike Trail", "Bingo Hall", "Biotechnology", "Biotechnology Company", "Blacksmith", "Blinds & Curtains Store", "Blogger", "Blood Bank", "Board game", "Boat Dealership", "Boat/Ferry Company", "Boat Rental", "Boat / Sailing Instructor", "Boat Service", "Boat Tour Agency", "Book", "Book & Magazine Distributor", "Book series", "Books & Magazines", "Bookstore", "Book Store", "Borough", "Botanical Garden", "Bottled Water Company", "Bottled Water Supplier", "Boutique Store", "Bowling Alley", "Brand", "Brand Agency", "Brand/Company Type", "Brazilian Restaurant", "Breakfast & Brunch Restaurant", "Brewery", "Bridal Shop", "Bridge", "British Restaurant", "Broadcasting & Media Production Company", "Brokerage", "Brokerage Firm", "Bubble Tea Shop", "Buddhist Temple", "Buffet Restaurant", "Building Materials", "Building Material Store", "Burger Restaurant", "Burmese Restaurant", "Business", "Business Center", "Business Consultant", "Business/economy website", "Business & Economy Website", "Business person", "Business Service", "Business services", "Business Supply Service", "Bus Line", "Bus Station", "Bus Tour Agency", "Butcher Shop", "Cabin", "Cabinet & Countertop Store", "Cable & Satellite Company", "Cafe", "Cafeteria", "Cajun & Creole Restaurant", "Calabrian Restaurant", "Cambodian Restaurant", "Camera/photo", "Camera Store", "Campground", "Campus Building", "Canadian Restaurant", "Canal", "Candy Store", "Canoe & Kayak Rental", "Canoe & Kayak Rental Shop", "Cantonese Restaurant", "Car Dealership", "Cardiologist", "Career Counselor", "Cargo & Freight Company", "Caribbean Restaurant", "Car Rental", "Car Stereo Store", "Car Wash"];

    filteredOptions: Observable<string[]>;
    constructor(private http: HttpService,private route:ActivatedRoute, private pagerService: PagerService ) {

    }
    ngAfterViewInit() {
    }
    ngOnInit() {
        this.currentUser =JSON.parse(localStorage.getItem('currentUser'));
        this.influencers = this.load_influencers;
        console.log('Flicker Response is ..............',this.influencers);
        this.pager = this.pagerService.getPager(this.influencers['items'], 1, 10);

        this.http.get(Config.api+'/get_iList_names_fl/' + this.currentUser.username+'/-id/')
            .subscribe(res => {
                // user_list = res.json();
                for (let li of res.json().results) {
                    // let d= li['id']
                    //  li['name']
                    this.user_list[li['id']] = li['name'] ;
                    this.checklistname = true;
                    // user_list.push({})
                }


            });
    }
    goToFlickr(s:string){

        let arr:any;
        arr = s.indexOf('(@');
        if(arr!=-1) {
            // alert(s.slice(arr+1,-10))
            // window.open('https://www.instagram.com/'+s.slice(arr+2,-10))
            let url = s.slice(arr+2,-10);
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
        else{
            let url = s;
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


    }
    getYTChannels(e) {
        // alert('called')
        this.selected_category = e['option']['value'];
        this.pager = {};
        this.setPage(1);
    }
    filterCategory(val: string): string[] {
        return this.options.filter(option =>
            option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }
    chec()  {
        console.clear();
        console.log(this.inflist);
    }
    cheakall(e) {
        for (let i of this.influencers['serializer'])
        {
            this.inflist[i['id']] = e;
        }
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


            },  (dismiss)=> {
                // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                if (dismiss === 'cancel') {
                    localStorage.removeItem('selected_list_fl');

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

                                    mysvc.post(Config.api + '/check_ilist_fl/', JSON.stringify({
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

                    mysvc.post(Config.api + '/create_add_ilist_fl/', JSON.stringify({
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
                        if(this.checklistname){
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

                                mysvc.put(Config.api + '/create_add_ilist_fl/', JSON.stringify({id: result, list: list}),
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

                            } ,  (dismiss) => {
                                // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                                if (dismiss === 'cancel') {
                                    swal(
                                        'Cancelled',
                                        'No list Updated :)',
                                        'success'
                                    )
                                }
                            })} else {
                            swal(
                                'No List created yet!',
                                '',
                                'warning'
                            )
                        }
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
        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
        this.loaded = false;
        headers.append('Content-Type', 'application/json');
        this.http.post(Config.api+'/ml/get_flickr_users/' + this.params_query + '/?page=' + page + '', {})
            .subscribe(res => {
                this.main_checkbox = false;
                this.influencers = res.json();
                this.pager = this.pagerService.getPager(this.influencers['items'], page,10);
                this.loaded = true;

            });


    }
    setPageQuery(page: number, query:string) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
        this.loaded = false;
        headers.append('Content-Type', 'application/json');
        this.http.get(Config.api+'/ml/get_instagram_users/' + query + '/?page=' + page + '', {headers:headers}, 'full')
            .subscribe(res => {
                this.main_checkbox = false;
                this.influencers = res.json();
                this.pager = this.pagerService.getPager(this.influencers['totalItems'], page,10);
                this.loaded = true;

            });
    }
    navSearch() {

    }



}
