import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {DataTableModule, OverlayPanelModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';
import {BlogosphereSearchRoutes} from "./blog-search.routing";
import {DialogModule} from 'primeng/primeng';
import {BlogosphereSearchComponent} from "./blog-search.component";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {NgPipesModule} from 'ngx-pipes';
import {PagerService} from "../_services/paginator.service";
import {RoundpipeModule} from "../home/roundpipe.module";
import {MatAutocompleteModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatTabsModule} from "@angular/material";





@NgModule({
    imports: [CommonModule, RouterModule.forChild(BlogosphereSearchRoutes),
      MatAutocompleteModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatTabsModule,
      SliderModule,ReactiveFormsModule,DataTableModule,OverlayPanelModule,DialogModule,FormsModule,RoundpipeModule,NgPipesModule],
    declarations: [BlogosphereSearchComponent],
    providers:[PagerService]
})

export class BlogosphereSearchModule { }
