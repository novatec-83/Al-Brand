import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {DataTableModule, OverlayPanelModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';
import {PeriscopeSearchRoutes} from "./periscope-search.routing";
import {DialogModule} from 'primeng/primeng';
import {PeriscopeSearchComponent} from './periscope-search.component';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {InlineEditorModule} from 'ng2-inline-editor';
import {NgPipesModule} from 'ngx-pipes';
import {PagerService} from "../_services/paginator.service";
import {RoundpipeModule} from "../home/roundpipe.module";
import {MatFormFieldModule,MatAutocompleteModule, MatCardModule, MatPaginatorModule, MatSortModule, MatTableModule,
    MatInputModule, MatRippleModule, MatSelectModule,MatTabsModule} from '@angular/material';
@NgModule({
    imports: [CommonModule, RouterModule.forChild(PeriscopeSearchRoutes),SliderModule,
      MatFormFieldModule,MatAutocompleteModule,InlineEditorModule, MatCardModule, MatPaginatorModule, MatSortModule, MatTableModule,
      MatInputModule, MatRippleModule, MatSelectModule,MatTabsModule,
        ReactiveFormsModule,DataTableModule,OverlayPanelModule,DialogModule,FormsModule,RoundpipeModule,NgPipesModule],
    declarations: [PeriscopeSearchComponent],
    providers:[PagerService]
})

export class PeriscopeSearchModule { }
