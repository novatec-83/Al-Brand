import {NgModule} from '@angular/core';
import {FacebookListInfComponent} from './facebook-list-inf.component';
import {FormsModule} from '@angular/forms';
import {FacebookListInfRoutes} from './facebook-list-inf.routing';
import {CommonModule} from '@angular/common';
import {NgPipesModule} from 'ngx-pipes';
import {RouterModule} from '@angular/router';
import {PagerService} from '../_services/paginator.service';
import {DataTableModule, OverlayPanelModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {InlineEditorModule} from 'ng2-inline-editor';
import {MatFormFieldModule,MatAutocompleteModule, MatCardModule, MatPaginatorModule, MatSortModule, MatTableModule,
    MatInputModule, MatRippleModule, MatSelectModule,MatTabsModule,} from '@angular/material';

@NgModule({
    imports:[RouterModule.forChild(FacebookListInfRoutes),
        CommonModule, FormsModule, InlineEditorModule, DataTableModule,
      MatFormFieldModule,MatAutocompleteModule, MatCardModule, MatPaginatorModule, MatSortModule, MatTableModule,
      MatInputModule, MatRippleModule, MatSelectModule,MatTabsModule,NgPipesModule, OverlayPanelModule, SliderModule, DialogModule],
    declarations:[FacebookListInfComponent],
    providers: [PagerService]
})
export class FacebookListInfModule {

}
