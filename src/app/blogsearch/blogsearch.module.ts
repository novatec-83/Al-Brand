import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {DataTableModule, OverlayPanelModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';

import {Blogsearchv2Routes} from "./blogsearch.routing";
import {DialogModule} from 'primeng/primeng';

import {Blogsearchv2Component} from "./blogsearchv2.component";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";

import {NgPipesModule} from 'ngx-pipes';
import {PagerService} from "../_services/paginator.service";
import {RoundpipeModule} from "../home/roundpipe.module";
import {MdAutocompleteModule} from "@angular/material";
import {BlogSearchCategoriesComponent} from "./blog-search-categories.component";

@NgModule({
    imports: [CommonModule, RouterModule.forChild(Blogsearchv2Routes),SliderModule,ReactiveFormsModule,DataTableModule,OverlayPanelModule,DialogModule,FormsModule,RoundpipeModule,NgPipesModule,MdAutocompleteModule],
    declarations: [Blogsearchv2Component,BlogSearchCategoriesComponent],
    providers:[PagerService]
})

export class BlogsearchModule { }
