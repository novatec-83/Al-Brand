import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {DataTableModule, OverlayPanelModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';

import {LinkedinSearchRoutes} from "./linkedin-search.routing";
import {DialogModule} from 'primeng/primeng';

import {LinkedinSearchComponent} from "./linkedin-search.component";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";

import {NgPipesModule} from 'ngx-pipes';
import {PagerService} from "../_services/paginator.service";
import {RoundpipeModule} from "../home/roundpipe.module";
import {MatFormFieldModule,MatAutocompleteModule,
    MatCardModule, MatPaginatorModule, MatSortModule, MatTableModule,
    MatInputModule, MatRippleModule, MatSelectModule,MatTabsModule} from '@angular/material';
@NgModule({
    imports: [CommonModule, RouterModule.forChild(LinkedinSearchRoutes),
        SliderModule,ReactiveFormsModule,DataTableModule,
      MatFormFieldModule,MatAutocompleteModule,
      MatCardModule, MatPaginatorModule, MatSortModule, MatTableModule,
      MatInputModule, MatRippleModule, MatSelectModule,MatTabsModule,
        OverlayPanelModule,DialogModule,FormsModule,RoundpipeModule,NgPipesModule],
    declarations: [LinkedinSearchComponent],
    providers:[PagerService]
})

export class LinkedinSearchModule { }
