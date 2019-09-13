import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {DataTableModule, OverlayPanelModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';
import {SearchRoutes} from "./search.routing";
import {DialogModule} from 'primeng/primeng';
import {SearchComponent} from "./search.component";
import {FormsModule} from "@angular/forms";
import {RoundpipeModule} from "./roundpipe.module";
import {NgPipesModule} from 'ngx-pipes';
import {PagerService} from "../_services/paginator.service";

@NgModule({
    imports: [CommonModule, RouterModule.forChild(SearchRoutes),SliderModule,DataTableModule,OverlayPanelModule,DialogModule,FormsModule,RoundpipeModule,NgPipesModule],
    declarations: [SearchComponent],
    providers:[PagerService]
})

export class SearchModule { }
