import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {DataTableModule, OverlayPanelModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';
import {LoaderModule} from '../loader/loader.module';
// import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
// import {InfluencersDatatableComponent} from "./influencers-datatable.component";
// import {SearchRoutes} from "./search.routing";
import {DialogModule} from 'primeng/primeng';
import {CustomPipeModule} from '../periscope-search/CustomPipe.module';
// import {SearchComponent} from "./search.component";
import {FormsModule} from "@angular/forms";
// import {RoundpipeModule} from "./roundpipe.module";
import {NgPipesModule} from 'ngx-pipes';
import {PagerService} from "../_services/paginator.service";
import {GenericSearchComponent} from "./generic-search.component";
import {YoutubeComponent} from "./youtube/youtube.component";
import {TwitterComponent} from "./twitter/twitter.component";
import {InstagramComponent} from "./instagram/instagram.component";
import {BlogosphereComponent} from "./blogosphere/blogosphere.component";
import {GenericSearchRoutes} from "./generic-search.routing";
import {RoundpipeModule} from "../home/roundpipe.module";
import {PreloaderModule} from "../components/preloader.module";
import {MdTabsModule} from "@angular/material";
import { FacebookComponent } from './facebook/facebook.component';
import { LinkedinComponent } from './linkedin/linkedin.component';
import { PinterestComponent } from './pinterest/pinterest.component';
import { PeriscopeComponent } from './periscope/periscope.component';
import { MediumComponent } from './medium/medium.component';
import { FlickrComponent } from './flickr/flickr.component';

// import {CategorycardComponent} from "./categorycard.component";
// import {PreloaderModule} from "../components/preloader.module";

@NgModule({
    imports: [CommonModule,RoundProgressModule,CustomPipeModule,LoaderModule, RouterModule.forChild(GenericSearchRoutes),SliderModule,DataTableModule,OverlayPanelModule,DialogModule,FormsModule,RoundpipeModule,NgPipesModule,PreloaderModule,MdTabsModule],
    declarations: [GenericSearchComponent,YoutubeComponent,TwitterComponent,InstagramComponent,BlogosphereComponent, FacebookComponent, LinkedinComponent, PinterestComponent, PeriscopeComponent, MediumComponent, FlickrComponent],
    providers:[PagerService]
})

export class GenericSearchModule { }
