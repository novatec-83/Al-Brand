import {Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { HttpService } from '../services/http-service';
import { Config } from '../../config';
import { Headers, Response, Http } from '@angular/http';
import {query} from '@angular/animations';
import Swal from "sweetalert2";
import {PagerService} from '../_services/paginator.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-searchpage',
    templateUrl: './searchpage.component.html',
    styleUrls: ['./searchpage.component.css'],
    providers:[PagerService]
})
export class SearchpageComponent implements OnInit {
    myControl: FormControl = new FormControl();
    inflist:any ={};
    user_list;
    main_checkbox:boolean;
    items: any[] = [
        {
            'name': 'airport - station'
        },
        {
            "name": "ancient - band names"
        },
        {
            "name": "applied science - chemistry"
        },
        {
            "name": "applied science - particle physics"
        },
        {
            "name": 'applied science - physics'
        },
        {
            "name": 'arts, culture and entertainment - animation'
        },
        {
            "name": "arts, culture and entertainment - archaeology"
        },
        {
            "name": "arts, culture and entertainment - architecture"
        },
        {
            "name": "arts, culture and entertainment - arts (general)"
        },
        {
            "name": "arts, culture and entertainment - bullfighting"
        },
        {
            "name": "arts, culture and entertainment - cinema"
        },
        {
            "name": "arts, culture and entertainment - culture (general)"
        },
        {
            "name": "arts, culture and entertainment - dance"
        },
        {
            "name": "arts, culture and entertainment - entertainment (general)"
        },
        {
            "name": "arts, culture and entertainment - fashion"
        },
        {
            "name": "arts, culture and entertainment - festive event"
        },
        {
            "name": "arts, culture and entertainment - festive event (including carnival)"
        },
        {
            "name": "arts, culture and entertainment - gaming"
        },
        {
            "name": "arts, culture and entertainment - history"
        },
        {
            "name": "arts, culture and entertainment - language"
        },
        {
            "name": "arts, culture and entertainment - library and museum"
        },
        {
            "name": "arts, culture and entertainment - literature"
        },
        {
            "name": "arts, culture and entertainment - mass media"
        },
        {
            "name": "arts, culture and entertainment - monument and heritage site"
        },
        {
            "name": "arts, culture and entertainment - music"
        },
        {
            "name": "arts, culture and entertainment - nightclub"
        },
        {
            "name": "arts, culture and entertainment - painting"
        },
        {
            "name": "arts, culture and entertainment - photography"
        },
        {
            "name": "arts, culture and entertainment - radio"
        },
        {
            "name": "arts, culture and entertainment - sculpture"
        },
        {
            "name": "arts, culture and entertainment - television"
        },
        {
            "name": "arts, culture and entertainment - theatre"
        },
        {
            "name": "belief (faith) - scientology"
        },
        {
            "name": "city news - general"
        },
        {
            "name": "company information - marketing"
        },
        {
            "name": "company information - recalls (products)"
        },
        {
            "name": "company information - research and development"
        },
        {
            "name": "computing and information technology - satellite technology"
        },
        {
            "name": "computing and information technology - software"
        },
        {
            "name": "computing and information technology - telecommunication service"
        },
        {
            "name": "crime, law and justice - crime"
        },
        {
            "name": "crime, law and justice - judiciary (system of justice)"
        },
        {
            "name": "crime, law and justice - justice and rights"
        },
        {
            "name": "crime, law and justice - organized crime"
        },
        {
            "name": "crime, law and justice - police"
        },
        {
            "name": "crime, law and justice - punishment"
        },
        {
            "name": "crime, law and justice - trials"
        },
        {
            "name": "crime, law and justice - war crime"
        },
        {
            "name": "defence - armed Forces"
        },
        {
            "name": "defence - biological and chemical weapons"
        },
        {
            "name": "defence - military equipment"
        },
        {
            "name": "defence - national security"
        },
        {
            "name": "defence - nuclear weapons"
        },
        {
            "name": "demographics - population and census"
        },
        {
            "name": "diplomacy - peace negotiations"
        },
        {
            "name": "diplomacy - summit"
        },
        {
            "name": "disaster and accident - crashed"
        },
        {
            "name": "disaster and accident - disaster (general)"
        },
        {
            "name": "disaster and accident - earthquake"
        },
        {
            "name": "disaster and accident - emergency incident"
        },
        {
            "name": "disaster and accident - famine"
        },
        {
            "name": "disaster and accident - fire"
        },
        {
            "name": "disaster and accident - flood"
        },
        {
            "name": "disaster and accident - nuclear accident"
        },
        {
            "name": "disaster and accident - relief and aid organisation"
        },
        {
            "name": "disaster and accident - rescue"
        },
        {
            "name": "disaster and accident - transport accident"
        },
        {
            "name": "disaster (general) - avalanche/landslide"
        },
        {
            "name": "disaster (general) - natural disasters"
        },
        {
            "name": "disease - AIDS"
        },
        {
            "name": "disease - alzheimer's disease"
        },
        {
            "name": "disease - animal diseases"
        },
        {
            "name": "disease - cancer"
        },
        {
            "name": "disease - heart disease"
        },
        {
            "name": "economy, business and finance - agriculture"
        },
        {
            "name": "economy, business and finance - business (general)"
        },
        {
            "name": "economy, business and finance - chemicals"
        },
        {
            "name": "economy, business and finance - computing and information technology"
        },
        {
            "name": "economy, business and finance - economy (general)"
        },
        {
            "name": "economy, business and finance - energy and resource"
        },
        {
            "name": "economy, business and finance - finance (general)"
        },
        {
            "name": "economy, business and finance - financial and business service"
        },
        {
            "name": "economy, business and finance - gaming"
        },
        {
            "name": "economy, business and finance - macro economics"
        },
        {
            "name": "economy, business and finance - manufacturing and engineering"
        },
        {
            "name": "economy, business and finance - market and exchange"
        },
        {
            "name": "economy, business and finance - media"
        },
        {
            "name": "economy, business and finance - metal and mineral"
        },
        {
            "name": "economy, business and finance - real estate"
        },
        {
            "name": "economy, business and finance - tourism and leisure"
        },
        {
            "name": "economy, business and finance - transport"
        },
        {
            "name": "education - adult education"
        },
        {
            "name": "education - entrance examination"
        },
        {
            "name": "education - further"
        },
        {
            "name": "education - further education"
        },
        {
            "name": "education - parent organisation"
        },
        {
            "name": "education - religious education"
        },
        {
            "name": "education - school"
        },
        {
            "name": "education - teaching and learning"
        },
        {
            "name": "election - nation"
        },
        {
            "name": "election - national elections"
        },
        {
            "name": "election - political campaigns"
        },
        {
            "name": "election - poll"
        },
        {
            "name": "election - regional elections"
        },
        {
            "name": "election - voting"
        },
        {
            "name": "employment - child labor"
        },
        {
            "name": "engineering - material science"
        },
        {
            "name": "environmental issue - conservation"
        },
        {
            "name": "environmental issue - energy saving"
        },
        {
            "name": "environmental issue - hazardous materials"
        },
        {
            "name": "environmental issue - natural resources"
        },
        {
            "name": "environmental issue - population"
        },
        {
            "name": "environmental issue - renewable energy"
        },
        {
            "name": "environmental issue - waste"
        },
        {
            "name": "environmental issue - water"
        },
        {
            "name": "euthanasia (also includes assisted suicide) - suicide"
        },
        {
            "name": "family - adoption"
        },
        {
            "name": "family - divorce"
        },
        {
            "name": "family - marriage"
        },
        {
            "name": "family - parent and child"
        },
        {
            "name": "family - sex"
        },
        {
            "name": "fun, music, animation - technology"
        },
        {
            "name": "game - chess"
        },
        {
            "name": "gaming - competition"
        },
        {
            "name": "gastronomy - organic foods"
        },
        {
            "name": "general - question"
        },
        {
            "name": "guerrilla activity - bombings"
        },
        {
            "name": "health - disease"
        },
        {
            "name": "health - epidemic and plague"
        },
        {
            "name": "health - government health care"
        },
        {
            "name": "health - healthcare policy"
        },
        {
            "name": "health - health organisations"
        },
        {
            "name": "health - hospital and clinic"
        },
        {
            "name": "health - illness"
        },
        {
            "name": "health - injury"
        },
        {
            "name": "health - medical research"
        },
        {
            "name": "health - medical service"
        },
        {
            "name": "health - medical staff"
        },
        {
            "name": "health - medicine"
        },
        {
            "name": "health - patient"
        },
        {
            "name": "health - physical fitness"
        },
        {
            "name": "health - preventative medicine"
        },
        {
            "name": "health - private health care"
        },
        {
            "name": "health treatment - diet"
        },
        {
            "name": "health treatment - prescription drugs"
        },
        {
            "name": "hobby - DIY"
        },
        {
            "name": "hobby - gardening"
        },
        {
            "name": "hobby - shopping"
        },
        {
            "name": "hollywood - actor"
        },
        {
            "name": "hollywood - actress"
        },
        {
            "name": "hollywood - movies"
        },
        {
            "name": "hollywood - season"
        },
        {
            "name": "hollywood - singer"
        },
        {
            "name": "human interest - animal"
        },
        {
            "name": "human interest - award and prize"
        },
        {
            "name": "human interest - disease"
        },
        {
            "name": "human interest - epidemic and plague"
        },
        {
            "name": "human interest - government health care"
        },
        {
            "name": "human interest - healthcare policy"
        },
        {
            "name": "human interest - health organisations"
        },
        {
            "name": "human interest - hospital and clinic"
        },
        {
            "name": "human interest - illness"
        },
        {
            "name": "human interest - imperial and royal matters"
        },
        {
            "name": "human interest - injury"
        },
        {
            "name": "human interest - medical research"
        },
        {
            "name": "human interest - medical service"
        },
        {
            "name": "human interest - medical staff"
        },
        {
            "name": "human interest - medicine"
        },
        {
            "name": "human interest - patient"
        },
        {
            "name": "human interest - people"
        },
        {
            "name": "human interest - physical fitness"
        },
        {
            "name": "human interest - plant"
        },
        {
            "name": "human interest - preventative medicine"
        },
        {
            "name": "human interest - private health care"
        },
        {
            "name": "human science - anthropology"
        },
        {
            "name": "human science - history"
        },
        {
            "name": "human science - psychology"
        },
        {
            "name": "human science - social sciences"
        },
        {
            "name": "ice - hockey"
        },
        {
            "name": "illness - eating disorder"
        },
        {
            "name": "illness - mental illness"
        },
        {
            "name": "illness - obesity"
        },
        {
            "name": "interior policy - data protection"
        },
        {
            "name": "interior policy - pension and welfare"
        },
        {
            "name": "interior policy - planning inquiries"
        },
        {
            "name": "isaster (general) - genetics"
        },
        {
            "name": "isaster (general) - isaster (general)"
        },
        {
            "name": "labour - advanced training"
        },
        {
            "name": "labour - employee"
        },
        {
            "name": "labour - employment"
        },
        {
            "name": "labour - labour legislation"
        },
        {
            "name": "labour - retirement"
        },
        {
            "name": "labour - strike"
        },
        {
            "name": "labour - unemployment"
        },
        {
            "name": "lifestyle and leisure - adventure"
        },
        {
            "name": "lifestyle and leisure - auto trends"
        },
        {
            "name": "lifestyle and leisure - beauty"
        },
        {
            "name": "lifestyle and leisure - club and association"
        },
        {
            "name": "lifestyle and leisure - consumer issue"
        },
        {
            "name": "lifestyle and leisure - fishing"
        },
        {
            "name": "lifestyle and leisure - game"
        },
        {
            "name": "lifestyle and leisure - gaming"
        },
        {
            "name": "lifestyle and leisure - gaming and lottery"
        },
        {
            "name": "lifestyle and leisure - hobby"
        },
        {
            "name": "lifestyle and leisure - holiday or vacation"
        },
        {
            "name": "lifestyle and leisure - hunting"
        },
        {
            "name": "lifestyle and leisure - leisure (general)"
        },
        {
            "name": "lifestyle and leisure - lifestyle (house and home)"
        },
        {
            "name": "lifestyle and leisure - public holiday"
        },
        {
            "name": "lifestyle and leisure - romance"
        },
        {
            "name": "lifestyle and leisure - tourism"
        },
        {
            "name": "lifestyle and leisure - wedding"
        },
        {
            "name": "massacre - genocide"
        },
        {
            "name": "media, journalism - business"
        },
        {
            "name": "medical specialisation - genetics"
        },
        {
            "name": "minority group - gays and lesbians"
        },
        {
            "name": "motivation - people"
        },
        {
            "name": "motor racing - endurance"
        },
        {
            "name": "motor racing - Formula One"
        },
        {
            "name": "motor racing - NASCAR"
        },
        {
            "name": "natural resources - forests"
        },
        {
            "name": "natural resources - mountains"
        },
        {
            "name": "natural resources - oceans"
        },
        {
            "name": "natural resources - parks"
        },
        {
            "name": "natural resources - rivers"
        },
        {
            "name": "natural resources - wildlife"
        },
        {
            "name": "natural science - astronomy"
        },
        {
            "name": "natural science - biology"
        },
        {
            "name": "natural science - geography"
        },
        {
            "name": "natural science - geology"
        },
        {
            "name": "natural science - physiology"
        },
        {
            "name": "natural science - zoology"
        },
        {
            "name": "news - general"
        },
        {
            "name": "news - politics"
        },
        {
            "name": "organization - celebration"
        },
        {
            "name": "people - accomplishment"
        },
        {
            "name": "people - celebrity"
        },
        {
            "name": "people - quotes"
        },
        {
            "name": "politics - censorship"
        },
        {
            "name": "politics - citizens initiative and recall"
        },
        {
            "name": "politics - constitution"
        },
        {
            "name": "politics - defence"
        },
        {
            "name": "politics - espionage and intelligence"
        },
        {
            "name": "politics - foreign aid"
        },
        {
            "name": "politics - freedom of religion"
        },
        {
            "name": "politics - freedom of the press"
        },
        {
            "name": "politics (general) - democracy"
        },
        {
            "name": "politics - government"
        },
        {
            "name": "politics - human rights"
        },
        {
            "name": "politics - interior policy"
        },
        {
            "name": "politics - lobbying"
        },
        {
            "name": "politics - local authority"
        },
        {
            "name": "politics - migration"
        },
        {
            "name": "politics - opposition"
        },
        {
            "name": "politics - parliament"
        },
        {
            "name": "politics - parties and movements"
        },
        {
            "name": "politics - politics (general)"
        },
        {
            "name": "politics - referenda"
        },
        {
            "name": "politics - refugee"
        },
        {
            "name": "politics - regulatory policy and organisation"
        },
        {
            "name": "politics - state budget and tax"
        },
        {
            "name": "politics - treaty"
        },
        {
            "name": "religion and belief - belief (faith)"
        },
        {
            "name": "religion and belief - buddhism"
        },
        {
            "name": "religion and belief - christianity"
        },
        {
            "name": "religion and belief - cult and sect"
        },
        {
            "name": "religion and belief - hinduism"
        },
        {
            "name": "religion and belief - islam"
        },
        {
            "name": "religion and belief - judaism"
        },
        {
            "name": "religion and belief - philosophy"
        },
        {
            "name": "religion and belief - sikhism"
        },
        {
            "name": "religious festival or holiday - christmas"
        },
        {
            "name": "religious festival or holiday - diwali"
        },
        {
            "name": "religious festival or holiday - easter"
        },
        {
            "name": "religious festival or holiday - eid"
        },
        {
            "name": "religious festival or holiday - ramadan"
        },
        {
            "name": "religious leader - pop"
        },
        {
            "name": "religious leader - pope"
        },
        {
            "name": "religious text - bible"
        },
        {
            "name": "religious text - gita"
        },
        {
            "name": "religious text - Quran Majeed"
        },
        {
            "name": "road - under construction"
        },
        {
            "name": "sarcasm - comedy"
        },
        {
            "name": "science and technology - agricultural research and technology"
        },
        {
            "name": "science and technology - animal science"
        },
        {
            "name": "science and technology - electronics"
        },
        {
            "name": "science and technology - engineering"
        },
        {
            "name": "science and technology - identification technology"
        },
        {
            "name": "science and technology - IT/computer sciences"
        },
        {
            "name": "science and technology - marine science"
        },
        {
            "name": "science and technology - mathematics"
        },
        {
            "name": "science and technology - nanotechnology"
        },
        {
            "name": "science and technology - research"
        },
        {
            "name": "science and technology - science (general)"
        },
        {
            "name": "science and technology - space programme"
        },
        {
            "name": "science and technology - technology (general)"
        },
        {
            "name": "social - app"
        },
        {
            "name": "social issue - abortion"
        },
        {
            "name": "social issue - addiction"
        },
        {
            "name": "social issue - charity"
        },
        {
            "name": "social issue - death and dying"
        },
        {
            "name": "social issue - family"
        },
        {
            "name": "social issue - family planning"
        },
        {
            "name": "social issue - health insurance"
        },
        {
            "name": "social issue - homelessness"
        },
        {
            "name": "social issue - long term care"
        },
        {
            "name": "social issue - people"
        },
        {
            "name": "social issue - pornography"
        },
        {
            "name": "social issue - poverty"
        },
        {
            "name": "social issue - prostitution"
        },
        {
            "name": "social issue - racism"
        },
        {
            "name": "social issues (general) - discrimination"
        },
        {
            "name": "social issue - slavery"
        },
        {
            "name": "social issue - welfare"
        },
        {
            "name": "social media - celebration"
        },
        {
            "name": "social media - trends"
        },
        {
            "name": "sport - alpine skiing"
        },
        {
            "name": "sport - American football"
        },
        {
            "name": "sport - archery"
        },
        {
            "name": "sport - athletics, track and field"
        },
        {
            "name": "sport - baseball"
        },
        {
            "name": "sport - basketball"
        },
        {
            "name": "sport - billiards, snooker and pool"
        },
        {
            "name": "sport - boxing"
        },
        {
            "name": "sport - canoeing and kayaking"
        },
        {
            "name": "sport - climbing"
        },
        {
            "name": "sport - cricket"
        },
        {
            "name": "sport - curling"
        },
        {
            "name": "sport - cycling"
        },
        {
            "name": "sport - diving"
        },
        {
            "name": "sport - equestrian"
        },
        {
            "name": "sport - fencing"
        },
        {
            "name": "sport - football"
        },
        {
            "name": "sport - golf"
        },
        {
            "name": "sport - gulf"
        },
        {
            "name": "sport - gymnastics"
        },
        {
            "name": "sport - handball (team)"
        },
        {
            "name": "sport - horse racing, harness racing"
        },
        {
            "name": "sport - ice hockey"
        },
        {
            "name": "sport - ipl"
        },
        {
            "name": "sport - judo"
        },
        {
            "name": "sport - marathon"
        },
        {
            "name": "sport - modern pentathlon"
        },
        {
            "name": "sport - motor netball"
        },
        {
            "name": "sport - motor racing"
        },
        {
            "name": "sport - motor rallying"
        },
        {
            "name": "sport - netball"
        },
        {
            "name": "sport - power boating"
        },
        {
            "name": "sport - rowing"
        },
        {
            "name": "sport - rugby league"
        },
        {
            "name": "sport - rugby union"
        },
        {
            "name": "sport - sailing"
        },
        {
            "name": "sports event - Commonwealth Games"
        },
        {
            "name": "sports event - Grand Prix"
        },
        {
            "name": "sports event - Summer Olympics"
        },
        {
            "name": "sports event - Super Bowl"
        },
        {
            "name": "sports event - Winter Olympics"
        },
        {
            "name": "sports event - World Cup"
        },
        {
            "name": "sport - shooting"
        },
        {
            "name": "sport - snow boarding"
        },
        {
            "name": "sport - soccer"
        },
        {
            "name": "sport - softball"
        },
        {
            "name": "sport - speedway"
        },
        {
            "name": "sport - squash"
        },
        {
            "name": "sport - sumo wrestling"
        },
        {
            "name": "sport - surfing"
        },
        {
            "name": "sport - swimming"
        },
        {
            "name": "sport - table tennis"
        },
        {
            "name": "sport - taekwon"
        },
        {
            "name": "sport - Taekwon"
        },
        {
            "name": "sport - Taekwon-Do"
        },
        {
            "name": "sport - tennis"
        },
        {
            "name": "sport - triathlon"
        },
        {
            "name": "sport - ultimate fighting championship"
        },
        {
            "name": "sport - volleyball"
        },
        {
            "name": "sport - water polo"
        },
        {
            "name": "sport - weightlifting"
        },
        {
            "name": "sport - wrestling"
        },
        {
            "name": "television and radio - performance"
        },
        {
            "name": "unrest, conflicts and war - act of terror"
        },
        {
            "name": "unrest, conflicts and war - crisis"
        },
        {
            "name": "unrest, conflicts and war - massacre"
        },
        {
            "name": "unrest, conflicts and war - riots"
        },
        {
            "name": "unrest, conflicts and war - war"
        },
        {
            "name": "upcoming - season"
        },
        {
            "name": "values - ethics"
        },
        {
            "name": "wage and pension - employee benefits"
        },
        {
            "name": "wage and pension - social security"
        }
    ];
    term;
    twQuery;
    b1Query;
    b2Query;
    filteredCountriesSingle: any[];
    searchword;
    filteredsearchwords: any[];
    pager: any = {};
    filteredCountriesMultiple: any[];
    searchSuggestions:any=[];
    searchSuggestions1:any=[];
    loaded:boolean= false;
    filteredOptions: Observable<string[]>;
    influencers;
    results:any=[];
     blogdata: any[];
     seodata: any;
     dialogVisible: boolean;
     feature_data: any;
     dialogVisible_features: boolean;
     queryValue: any;
     selected_category;
     webInfluencers;
     currentUser: any;
     webResults;
     title: any;
     moz: any;
     alexa: any;
     seo: any;
     profile_pic;
    constructor(private router: Router,private httpNoPreloader: Http, private pagerService: PagerService,private http: HttpService,private http1: Http) {
    }
    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }
    ngOnInit() {
        this.currentUser =JSON.parse(localStorage.getItem('currentUser'));
        this.profile_pic= this.currentUser.profile_image;

        this.http1.get(Config.api +'/blog/search/suggestions/')
            .subscribe(res => {
                this.searchSuggestions = res.json();
            });
        this.http.get(Config.api+'/get_iList_names/' + this.currentUser.username+'/-id/').subscribe(res=>{
           this.user_list= res.json().results;
        });

        this.setPagedefaults(1);
        this.filterCategory();

    }
     filterCategory() {
         // return this.searchSuggestions.filter(option =>
         //     option.toLowerCase().indexOf(val.toLowerCase()) === 0);
         for(let item of this.searchSuggestions){
             this.searchSuggestions1.push(item['name']);
         }
     }

    searchTwitter(e) {
        if (e.keyCode == 13) {
            if(this.twQuery['name']) {
                // alert(this.twQuery['name'])
                this.router.navigate(['/search',this.twQuery['name']])
            }
            else {
                // alert(this.twQuery)
                this.router.navigate(['/search',this.twQuery])
            }
        }
    }

    cheakall(e) {

        for (let i of this.webInfluencers['results'])
        {
            this.inflist[i['id']] = e;
        }
        console.clear();


    }
    cheakalldef(e) {

        for (let i of this.results)
        {
            this.inflist[i['id']] = e;
        }
        console.clear();


    }
    clear_list_def() {
        for (let i in this.inflist) {
            this.inflist[i] = false;
        }
    }
    add_create_list() {
        let currentUser =JSON.parse(localStorage.getItem('currentUser'));
        this.httpNoPreloader.get(Config.api+'/get_iList_names/' + currentUser.username+'/-id/')
            .subscribe(res => {
                this.user_list = res.json();
                for (let li of res.json().results) {
                    this.user_list[li['id']] = li['name'] ;
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
                    localStorage.removeItem('selected_list');

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
          Swal.fire(
              {
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

            Swal.fire(
                  {
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

                    mysvc.post(Config.api + '/create_add_ilist/', JSON.stringify({
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
                      Swal.fire(
                          {
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

    search(search: string) {
        //{"text":"arts","username":"billubhai","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InVtYXIuYmlsYWxAYnJhaW5wbG93LmNvbSIsInVzZXJuYW1lIjoidW1hcmJpbGFsIiwib3JpZ19pYXQiOjE1MDMzOTU1NTMsImV4cCI6MTUwMzM5NTg1M30.5xZYL_1HOoIiRwRlF1NTZ-lxQRwKLlXh_Yx9RTaMPCg", "reply_channel": "daphne.response.rOXStTDRJo!RjpFXOwgzm"}

        const replay_channel = localStorage.getItem('replay_channel');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers();
        // if (currentUser && currentUser.token) {
        //     headers = new Headers({ 'Authorization': 'JWT ' + currentUser.token });
        // }


        headers.append('Content-Type', 'application/json');

        return this.http.post(Config.api+'/blog/tasks/', JSON.stringify({token: currentUser.token, reply_channel:replay_channel, search:search, username: currentUser.username}),
            {headers: headers}).map((response: Response) => response.json());
    }

    startBRO(value) {
        this.search(value)
            .subscribe(
                data => {
                    // this.alertService.success('Registration successful', true);
                    // this.router.navigate(['/login']);
                    // alert('success')
                },
                error => {
                    // this.alertService.error(error);
                    // this.loading = false;
                    alert('error')
                });
    }


    search1(search: string) {
        //{"text":"arts","username":"billubhai","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InVtYXIuYmlsYWxAYnJhaW5wbG93LmNvbSIsInVzZXJuYW1lIjoidW1hcmJpbGFsIiwib3JpZ19pYXQiOjE1MDMzOTU1NTMsImV4cCI6MTUwMzM5NTg1M30.5xZYL_1HOoIiRwRlF1NTZ-lxQRwKLlXh_Yx9RTaMPCg", "reply_channel": "daphne.response.rOXStTDRJo!RjpFXOwgzm"}

        const replay_channel = localStorage.getItem('replay_channel');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers();
        // if (currentUser && currentUser.token) {
        //     headers = new Headers({ 'Authorization': 'JWT ' + currentUser.token });
        // }


        headers.append('Content-Type', 'application/json');

        return this.http.post(Config.api+'/blog/tasks/v1/', JSON.stringify({token: currentUser.token, reply_channel:replay_channel, search:search, username: currentUser.username}),
            {headers: headers}).map((response: Response) => response.json());
    }


    setPagedefaults(page: number) {
        // this.loaded = false;
        this.pager = {};
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

            this.http.get(Config.api + '/blog/get_blogsphere_pages_list' + '/?page=' + page)
                .subscribe(res => {
                    this.influencers = res.json();
                    this.results=this.influencers['results'];
                    // this.loaded = true;
                    this.pager = this.pagerService.getPager(this.influencers['totalItems'], page,10);

                });

    }

        gotoblog(url) {

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
    filldata(b) {
        let arr = [];
        for (let obj of b) {
            for (let key in obj) {
                arr.push(obj[key]);
            }

        }
        this.blogdata = arr;
    }

    startBRO1(value) {
        this.search1(value)
            .subscribe(
                data => {
                    // this.alertService.success('Registration successful', true);
                    // this.router.navigate(['/login']);
                    // alert('success')
                },
                error => {
                    // this.alertService.error(error);
                    // this.loading = false;
                    alert('error')
                });
    }

    searchB1(e) {
        if (e.keyCode == 13) {
            if(this.b1Query['name']) {
                // this.router.navigate(['/blogs/search/', this.b1Query['name']])
                this.startBRO1(this.b1Query['name'])
            }
            else {
                this.startBRO1(this.b1Query)
                // alert(this.b1Query)
                // this.router.navigate(['/blogs/search/', this.b1Query['name']])
            }
        }
    }
    searchB2(e) {
        if (e.keyCode == 13) {
            if(this.b2Query['name']) {
                // alert(this.b2Query['name'])
                this.startBRO(this.b2Query['name'])
            }
            else {
                // alert(this.b2Query)
                this.startBRO(this.b2Query)
            }
        }
    }

    searchB2Static(e) {

        this.selected_category= e['option']['value'];
        this.pager= {};
        this.setPage(1);
    }
    getCatNameWeb(e){
        this.selected_category= e.value;
    }
    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
        this.loaded = false;
        headers.append('Content-Type', 'application/json');
        this.http.post(Config.api+'/blog/web/' + this.selected_category + '/?page=' + page + '', {
            title: this.title,
            moz_rank: this.moz,
            seoData:this.seo,
        },{headers:headers})
            .subscribe(res => {
                this.main_checkbox = false;
                this.webInfluencers = res.json();
                this.webResults= this.webInfluencers['results'];
                this.pager = this.pagerService.getPager(this.webInfluencers['totalItems'], page,10);
                this.loaded = true;

            });



    }
    filterCountrySingle(event) {
        let query = event.query;
        // this.countryService.getCountries().then(countries => {
        this.filteredCountriesSingle = this.filterCountry(query, this.items);
        // });
    }
    filterSearchSingle(event) {
        let query = event.query;
        // this.countryService.getCountries().then(countries => {
        this.filteredsearchwords = this.filterCountry(query, this.searchSuggestions);
        // });
    }

    filterCountryMultiple(event) {
        let query = event.query;
        // this.countryService.getCountries().then(countries => {
        this.filteredCountriesMultiple = this.filterCountry(query, this.items);
        // });
    }

    filterCountry(query, countries: any[]): any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        for (let i = 0; i < countries.length; i++) {
            let country = countries[i];
            if (country.name.toLowerCase().includes(query.toLowerCase())) {
                filtered.push(country);
            }
        }
        return filtered;
    }
    fillseodata(b) {
        this.seodata = b;
        this.dialogVisible = true;
    }

    fillfeaturedata(b) {
        this.feature_data = b;
        this.dialogVisible_features = true;
    }

}
