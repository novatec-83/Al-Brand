import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import { DragulaModule } from 'ng2-dragula/ng2-dragula';


import {InfluencersDatatableComponent} from "./influencers-datatable.component";
import {TwittercategoriesRoutes} from "./twittercategories.routing";
import {CategorycardComponent} from "./categorycard.component";
import {PreloaderModule} from "../components/preloader.module";

@NgModule({
    imports: [CommonModule, RouterModule.forChild(TwittercategoriesRoutes), PreloaderModule],
    declarations: [InfluencersDatatableComponent, CategorycardComponent]
})

export class TwittercategoriesModule { }
