import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FlickrSearchRoutes} from './flickr-search.routing';
import {DialogModule} from 'primeng/primeng';
import {FlickrSearchComponent} from './flickr-search.component';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {DataTableModule, OverlayPanelModule} from 'primeng/primeng';
import {NgPipesModule} from 'ngx-pipes';
import {PagerService} from "../_services/paginator.service";
import {RoundpipeModule} from "../home/roundpipe.module";
import {MatFormFieldModule,MatAutocompleteModule, MatCardModule, MatPaginatorModule, MatSortModule, MatTableModule,
    MatInputModule, MatRippleModule, MatSelectModule,MatTabsModule} from '@angular/material';
import {PreloaderModule} from "../components/preloader.module";
// import {RoundProgressModule} from 'angular-svg-round-progressbar';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FlickrSearchRoutes),
        PreloaderModule,
        DataTableModule,
      DialogModule,
      ReactiveFormsModule,
      OverlayPanelModule,
      MatFormFieldModule,MatAutocompleteModule, MatCardModule, MatPaginatorModule, MatSortModule, MatTableModule,
      MatInputModule, MatRippleModule, MatSelectModule,MatTabsModule ,       FormsModule,
        RoundpipeModule,
        NgPipesModule,
    ],
    declarations: [FlickrSearchComponent],
    providers:[PagerService]
})

export class FlickrSearchModule { }
