import {NgModule} from '@angular/core';
// import {FacebookSearchComponent} from './facebook-search.component';
import {FlickrListInfComponent} from './flickr-list-inf.component';
import {FormsModule} from '@angular/forms';
import { FlickrListInfRoutes} from './flickr-list-inf.routing';
import {CommonModule} from '@angular/common';
import {NgPipesModule} from 'ngx-pipes';
import {RouterModule} from '@angular/router';
import {PagerService} from '../_services/paginator.service';
import {DataTableModule, OverlayPanelModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {InlineEditorModule} from 'ng2-inline-editor';


@NgModule({
    imports:[RouterModule.forChild(FlickrListInfRoutes),
        CommonModule, FormsModule, InlineEditorModule, DataTableModule, NgPipesModule, OverlayPanelModule, SliderModule, DialogModule],
    declarations:[FlickrListInfComponent],
    providers: [PagerService]
})
export class FlickrListInfModule {

}
