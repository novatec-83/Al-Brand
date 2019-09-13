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
import {MediumListInfComponent} from './medium-list-inf.component';
import {InlineEditorModule} from "ng2-inline-editor";
import {MediumListInfRoutes} from './medium-list-inf.routing';

@NgModule({
    imports: [CommonModule,
        RouterModule.forChild(MediumListInfRoutes),
        ReactiveFormsModule,
        SliderModule,
        DataTableModule,
        InlineEditorModule,
        OverlayPanelModule,
        DialogModule,FormsModule,
        RoundpipeModule,
        NgPipesModule],
    declarations: [MediumListInfComponent],
    providers:[PagerService]
})

export class MediumListInfModule { }
