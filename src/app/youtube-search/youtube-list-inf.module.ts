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

import {YoutubeListInfComponent} from "./youtube-list-inf.component";
import {YoutubeListInfRoutes} from "./youtube-list-inf.routing";
import {InlineEditorModule} from "ng2-inline-editor";


@NgModule({
    imports: [CommonModule, RouterModule.forChild(YoutubeListInfRoutes),ReactiveFormsModule,SliderModule,DataTableModule,InlineEditorModule,OverlayPanelModule,DialogModule,FormsModule,RoundpipeModule,NgPipesModule],
    declarations: [YoutubeListInfComponent],
    providers:[PagerService]
})

export class YoutubeListInfModule { }
