import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {DataTableModule, OverlayPanelModule,SharedModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';
import {OptInInfluencersRoutes} from "./opt-in-influencers.routing";
import {DialogModule} from 'primeng/primeng';
import {FormsModule} from "@angular/forms";
import {NgPipesModule} from 'ngx-pipes';
import {PagerService} from "../_services/paginator.service";
import {OptInInfluencersComponent} from "./opt-in-influencers.component";


@NgModule({
    imports: [CommonModule, RouterModule.forChild(OptInInfluencersRoutes),SliderModule,DataTableModule,OverlayPanelModule,DialogModule,FormsModule,NgPipesModule],
    declarations: [OptInInfluencersComponent],
    providers:[PagerService]
})

export class OptInInfluencersModule { }
