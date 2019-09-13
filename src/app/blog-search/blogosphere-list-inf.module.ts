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
import {BlogosphereListInfComponent} from "./blogosphere-list-inf.component";
import {BlogosphereListInfRoutes} from "./blogosphere-list-inf.routing";
import {InlineEditorModule} from "ng2-inline-editor";


@NgModule({
    imports: [CommonModule, RouterModule.forChild(BlogosphereListInfRoutes),ReactiveFormsModule,SliderModule,DataTableModule,InlineEditorModule,OverlayPanelModule,DialogModule,FormsModule,RoundpipeModule,NgPipesModule],
    declarations: [BlogosphereListInfComponent],
    providers:[PagerService]
})

export class BlogosphereListInfModule { }
