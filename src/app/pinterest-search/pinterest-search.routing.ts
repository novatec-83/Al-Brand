import { Routes } from '@angular/router';
import {PinterestSearchComponent} from "./pinterest-search.component";

export const PinterestSearchRoutes: Routes = [{
    path: '',
    component: PinterestSearchComponent,
    data: {
        heading: '',
    }
}];
