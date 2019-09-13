import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {DataTableModule, OverlayPanelModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';
import {InstagramSearchRoutes} from "./instagram-search.routing";
import {DialogModule} from 'primeng/primeng';
import {InstagramSearchComponent} from "./instagram-search.component";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {NgPipesModule} from 'ngx-pipes';
import {PagerService} from "../_services/paginator.service";
import {RoundpipeModule} from "../home/roundpipe.module";
import {MatFormFieldModule,MatAutocompleteModule, MatCardModule, MatPaginatorModule, MatSortModule, MatTableModule,
    MatInputModule, MatRippleModule, MatSelectModule,MatTabsModule} from '@angular/material';
@NgModule({
    imports: [CommonModule,
      MatFormFieldModule,MatAutocompleteModule, MatCardModule, MatPaginatorModule, MatSortModule, MatTableModule,
      MatInputModule, MatRippleModule, MatSelectModule,MatTabsModule,
        RouterModule.forChild(InstagramSearchRoutes),SliderModule,
        ReactiveFormsModule,DataTableModule,OverlayPanelModule,DialogModule,FormsModule,RoundpipeModule,NgPipesModule],
    declarations: [InstagramSearchComponent],
    providers:[PagerService]
})

export class InstagramSearchModule { }
