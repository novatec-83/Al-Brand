import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FacebookSearchRoutes} from "./facebook-search.routing";
import {DialogModule} from 'primeng/primeng';
import {FacebookSearchComponent} from "./facebook-search.component";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {DataTableModule, OverlayPanelModule} from 'primeng/primeng';
import {NgPipesModule} from 'ngx-pipes';
import {PagerService} from "../_services/paginator.service";
import {RoundpipeModule} from "../home/roundpipe.module";
import {MatFormFieldModule,MatAutocompleteModule, MatCardModule, MatPaginatorModule, MatSortModule, MatTableModule,
    MatInputModule, MatRippleModule, MatSelectModule,MatTabsModule} from '@angular/material';
import {PreloaderModule} from "../components/preloader.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FacebookSearchRoutes),
        PreloaderModule,
        DataTableModule,
      MatFormFieldModule,MatAutocompleteModule, MatCardModule, MatPaginatorModule, MatSortModule, MatTableModule,
      MatInputModule, MatRippleModule, MatSelectModule,MatTabsModule,
      ReactiveFormsModule,
      OverlayPanelModule,
      DialogModule,
        FormsModule,
        RoundpipeModule,
        MatCardModule,
        NgPipesModule,
        MatAutocompleteModule
    ],
    declarations: [FacebookSearchComponent],
    providers:[PagerService]
})

export class FacebookSearchModule { }
