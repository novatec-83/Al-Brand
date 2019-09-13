import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {DataTableModule, OverlayPanelModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';

import {DialogModule} from 'primeng/primeng';


import {FormsModule,ReactiveFormsModule} from "@angular/forms";

import {NgPipesModule} from 'ngx-pipes';
import {PagerService} from "../_services/paginator.service";
import {RoundpipeModule} from "../home/roundpipe.module";

import {BlogListInfComponent} from "./blog-list-inf.component";
import {BlogListInfRoutes} from "./blog-list-inf.routing";
import {InlineEditorModule} from "ng2-inline-editor";
import {CsvService} from "angular2-json2csv";


@NgModule({
    imports: [CommonModule, RouterModule.forChild(BlogListInfRoutes),ReactiveFormsModule,SliderModule,DataTableModule,InlineEditorModule,OverlayPanelModule,DialogModule,FormsModule,RoundpipeModule,NgPipesModule],
    declarations: [BlogListInfComponent],
    providers:[PagerService,CsvService]
})

export class BlogListInfModule { }
