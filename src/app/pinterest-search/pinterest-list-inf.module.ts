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
import {PinterestListInfComponent} from './pinterest-list-inf.component';
import {InlineEditorModule} from "ng2-inline-editor";
import {PintersetListInfRoutes} from './pinterest-list-inf.routing';
import {PinterestSearchComponent} from './pinterest-search.component';


@NgModule({
    imports: [CommonModule, RouterModule.forChild(PintersetListInfRoutes),ReactiveFormsModule,SliderModule,DataTableModule,InlineEditorModule,OverlayPanelModule,DialogModule,FormsModule,RoundpipeModule,NgPipesModule],
    declarations: [PinterestListInfComponent],
    providers:[PagerService]
})

export class PinterestListInfModule { }
