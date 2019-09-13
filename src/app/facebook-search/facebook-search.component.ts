import {Component, OnInit,} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FormControl, Validators} from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {Config} from "../../config";
import {HttpService} from "../services/http-service";
import {Headers, Response, Http} from '@angular/http';
import Swal from 'sweetalert2';
import {ActivatedRoute} from '@angular/router';
import {PagerService} from '../_services/paginator.service';
import 'jspdf-autotable';
@Component({
  selector: 'app-facebook-search',
  templateUrl: './facebook-search.component.html',
  styleUrls: ['./facebook-search.component.scss'],

})
export class FacebookSearchComponent implements OnInit {

    myControl: FormControl = new FormControl();
    main_checkbox;
    fbinfluencers;
    options = ["Abortion Service", "Academic Camp", "Accessories", "Accessories Store", "Accountant", "Actor", "Actor/director", "Acupuncturist", "Addiction Resources Center", "Addiction Service", "Addiction Treatment Center", "Adoption Service", "Adult Entertainment Service", "Advertising Agency", "Advertising/Marketing", "Advertising/Marketing Service", "Aerospace Company", "Aerospace/defense", "Afghani Restaurant", "African Restaurant", "Agricultural Cooperative", "Agricultural Service", "Agriculture", "Agriculture Company", "AIDS Resource Center", "Aircraft Dealership", "Airline Company", "Airline Industry Service", "Airport", "Airport Lounge", "Airport Shuttle Service", "Airport Terminal", "Album", "Alcohol Addiction Treatment Center", "Allergist", "Alternative & Holistic Health Service", "Amateur sports team", "Amateur Sport Team", "American Restaurant", "Amusement Center", "Amusement & Theme Park", "Andhra Restaurant", "Anesthesiologists", "Anglican Church", "Animal", "Animal breed", "Animal Shelter", "Antique Store", "Apartment & Condo Building", "Apostolic Church", "Apparel", "Apparel & Clothing", "Apparel Company", "Apparel Distributor", "Appliance Manufacturer", "Appliance Repair Service", "Appliances", "App page", "Aquarium", "Aquatic Pet Store", "Arabian Restaurant", "Arcade", "Archaeological Service", "Archery Range", "Archery Shop", "Architect", "Architectural Designer", "Architectural Engineer", "Argentinian Restaurant", "Armed Forces", "Armenian Restaurant", "Aromatherapy Service", "Art", "Art Gallery", "Artist", "Art Museum", "Art Restoration Service", "Art School", "Arts & Crafts Store", "Arts & Entertainment", "Arts/entertainment/nightlife", "Arts/humanities website", "Arts & Humanities Website", "Art Tour Agency", "Asian Fusion Restaurant", "Asian Restaurant", "Astrologist", "Astrologist & Psychic", "Athlete", "Attractions/things to do", "ATV Dealership", "ATV Recreation Park", "ATV Rental", "ATV Rental Shop", "Auction House", "Audiologist", "Audio Visual Equipment Store", "Auditorium", "Australian Restaurant", "Austrian Restaurant", "Author", "Auto Detailing Service", "Automation Service", "Automobiles and parts", "Automotive", "Automotive, Aircraft & Boat", "Automotive, Aircraft, Boat", "Automotive Body Shop", "Automotive Company", "Automotive Consultant", "Automotive Customization Shop", "Automotive Dealership", "Automotive Glass Service", "Automotive Leasing Service", "Automotive Manufacturer", "Automotive Parts Store", "Automotive Repair Shop", "Automotive Restoration Service", "Automotive Service", "Automotive Shipping Service", "Automotive Storage Facility", "Automotive Store", "Automotive Wholesaler", "Automotive Window Tinting Service", "Aviation", "Aviation School", "Awning Supplier", "Baby & Children's Clothing Store", "Baby Goods/Kids Goods", "Babysitter", "Bags/luggage", "Bags & Luggage Company", "Bags & Luggage Store", "Bail Bondsmen", "Bakery", "Ballroom", "Band", "Bank", "Bank Equipment & Service", "Bank/financial institution", "Bank/Financial Service", "Bank/financial services", "Bankruptcy Lawyer", "Baptist Church", "Bar", "Barbecue Restaurant", "Barber Shop", "Bar & Grill", "Bartending School", "Bartending Service", "Baseball Field", "Basketball Court", "Basque Restaurant", "Batting Cage", "Bavarian Restaurant", "Beach", "Beach Resort", "Beauty", "Beauty, Cosmetic & Personal Care", "Beauty/Cosmetics Company", "Beauty Salon", "Beauty Service", "Beauty Store", "Beauty Supplier", "Beauty Supply Store", "Bed and Breakfast", "Beer Bar", "Beer Garden", "Belgian Restaurant", "Bengali/Bangladeshi Restaurant", "Betting Shop", "Bicycle Rental Shop", "Bicycle Repair Service", "Bicycle Shop", "Big Box Retailer", "Bike Rental", "Bike Trail", "Bingo Hall", "Biotechnology", "Biotechnology Company", "Blacksmith", "Blinds & Curtains Store", "Blogger", "Blood Bank", "Board game", "Boat Dealership", "Boat/Ferry Company", "Boat Rental", "Boat / Sailing Instructor", "Boat Service", "Boat Tour Agency", "Book", "Book & Magazine Distributor", "Book series", "Books & Magazines", "Bookstore", "Book Store", "Borough", "Botanical Garden", "Bottled Water Company", "Bottled Water Supplier", "Boutique Store", "Bowling Alley", "Brand", "Brand Agency", "Brand/Company Type", "Brazilian Restaurant", "Breakfast & Brunch Restaurant", "Brewery", "Bridal Shop", "Bridge", "British Restaurant", "Broadcasting & Media Production Company", "Brokerage", "Brokerage Firm", "Bubble Tea Shop", "Buddhist Temple", "Buffet Restaurant", "Building Materials", "Building Material Store", "Burger Restaurant", "Burmese Restaurant", "Business", "Business Center", "Business Consultant", "Business/economy website", "Business & Economy Website", "Business person", "Business Service", "Business services", "Business Supply Service", "Bus Line", "Bus Station", "Bus Tour Agency", "Butcher Shop", "Cabin", "Cabinet & Countertop Store", "Cable & Satellite Company", "Cafe", "Cafeteria", "Cajun & Creole Restaurant", "Calabrian Restaurant", "Cambodian Restaurant", "Camera/photo", "Camera Store", "Campground", "Campus Building", "Canadian Restaurant", "Canal", "Candy Store", "Canoe & Kayak Rental", "Canoe & Kayak Rental Shop", "Cantonese Restaurant", "Car Dealership", "Cardiologist", "Career Counselor", "Cargo & Freight Company", "Caribbean Restaurant", "Car Rental", "Car Stereo Store", "Car Wash"];
    influencers_by_default_FB: any=[];
    items: any={};
    currentList;
    column = {};
    selectedCategory;
    title;
    location;
    model: any={};
    ER;
    likes;
    perfomance;
    locationArray:any=[];
    max= 10;
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
    selected_category;
    private cName: string;
     triggered_email;
        body;
        subject;
        password;
    subjectFormControl = new FormControl('', [
        Validators.required,
    ]);
    messageFormControl = new FormControl('', [
        Validators.required]);

    constructor(private http: HttpService,
                private route: ActivatedRoute, private pagerService: PagerService) {

    }
    // ngOnDestroy(){
    //     localStorage.setItem('select_list_fb', JSON.stringify({id: this.currentList.id, name: this.currentList.name,listPage: false}));
    // }
    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }
    ngOnInit() {

            this.password= localStorage.getItem('currentPassword');

        this.currentUser =JSON.parse(localStorage.getItem('currentUser'));


        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
        headers.append('Content-Type', 'application/json');

        this.http.get(Config.api + '/ml/facebook_categories')
            .subscribe(res => {

                this.options = res.json();

                this.filteredOptions = this.myControl.valueChanges
                    .startWith(null)
                    .map(val => val ? this.filterCategory(val) : this.options.slice());
            });



        this.http.get(Config.api + '/get_iList_names_fb/' + this.currentUser.username + '/-id/')
            .subscribe(res => {
                for (let li of res.json().results) {
                    this.user_list[li['id']] = li['name'];
                    this.checklistname = true;
                }


            });

this.get_default_FB_data(1);
    }




    getCatName(e){

        this.selected_category= e.value;
    }

    getEmail(e){
        this.triggered_email=e.email;
    }


                sendEmail(){

                    this.http.post(Config.api+'/email_from_brand/'  , {
                        username: this.currentUser.username,
                        email: this.triggered_email,
                        message: this.body,
                        subject: this.subject,
                        password: this.password
                    })
                        .subscribe(res => {
                            // this.main_checkbox = false;
                            this.influencers_by_default_FB = res.json();


                        });

                    }

    page(pageSize){

            if (pageSize) {
                this.pageSize = pageSize;
                this.get_default_FB_data(1);
            }
            else {
                delete this.pageSize;
            }

    }
    get_default_FB_data(page: number){

        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // this.http.post(Config.api+'ml/get_facebook_pages/accountant'  + '/?page=' + page,{})
        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});

        this.http.post(Config.api+'/ml/get_facebook_pages/' + 'accountant' + '/?page=' + page + '', {},{headers: headers})
            .subscribe(res => {
                // this.main_checkbox = false;
                this.influencers_by_default_FB = res.json();
                this.pdfArray= this.influencers_by_default_FB['results'];
                    for(let obj of this.pdfArray){
                        this.locationArray= obj['category']['location'];
                    }

                this.pager = this.pagerService.getPager(this.influencers_by_default_FB['totalItems'], page,10);

            });
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

    filterCategory(val: string): string[] {
        return this.options.filter(option =>
            option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }

    getFbData(e){
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
        this.http.post(Config.api+'/ml/get_facebook_pages/' + this.selected_category + '/?page=' + page + '', {
            title: this.title,
            location: this.location,
            like:this.likes,
            performance:this.perfomance,
            ER:this.ER
        },{headers:headers})
            .subscribe(res => {
                this.main_checkbox = false;
                this.fbinfluencers = res.json();
                this.pager = this.pagerService.getPager(this.fbinfluencers['totalItems'], page,10);
                this.loaded = true;

            });


    }
    filterFBPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
        this.loaded = false;
        headers.append('Content-Type', 'application/json');
        this.http.post(Config.api+'/ml/get_facebook_pages/' + this.selected_category + '/?page=' + page + '', {
            title: this.title,
            location: this.location,
            like:this.title,
            performance:this.perfomance,
            ER:this.ER
        },{headers:headers})
            .subscribe(res => {
                this.main_checkbox = false;
                this.fbinfluencers = res.json();
                this.pager = this.pagerService.getPager(this.fbinfluencers['totalItems'], page,10);
                this.loaded = true;

            });


    }




    setCustomFilter(e){
        if (e.keyCode == 13 && this.location_value == this.cName) {
        }

    }

    checkedAll(e){

        for(let i of this.fbinfluencers['results'])
        {
            this.inflist[i['id']]= e;

        }

    }
    checkedAllDef(e){

        for(let i of this.influencers_by_default_FB['results'])
        {
            this.inflist[i['id']]= e;

        }

    }

    uncheckAll() {
        for (let i in this.inflist) {
            this.inflist[i] = false;
        }
    }
    add_create_list() {
        let currentUser =this.currentUser;


        let mysvc = this.http;
        let list=this.inflist;
        let ilist = false;
        let user_list =this.user_list;
        let current_list = JSON.parse(localStorage.getItem('select_list_fb'));
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

                mysvc.put(Config.api + '/create_add_ilist_fb/', JSON.stringify({id: current_list.id, list: list}),
                    {headers: headers}).map((response: Response) => response.json()).subscribe(
                    data => {

                        localStorage.removeItem('select_list_fb');
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
                    localStorage.removeItem('select_list_fb');

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

                                    mysvc.post(Config.api + '/check_ilist_fb/', JSON.stringify({
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

                    mysvc.post(Config.api + '/create_add_ilist_fb/', JSON.stringify({
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

                                mysvc.put(Config.api + '/create_add_ilist_fb/', JSON.stringify({id: result, list: list}),
                                    {headers: headers}).map((response: Response) => response.json()).subscribe(
                                    data => {
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
//access ID token mozscape-f1225f2e5e
// secret key 428f246675d4d98258bc37e77c39f383
