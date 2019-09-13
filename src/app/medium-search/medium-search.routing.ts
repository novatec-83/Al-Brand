import { Routes } from '@angular/router';
import {MediumSearchComponent} from './medium-search.component';

export const MediumSearchRoutes: Routes = [{
    path: '',
    component:MediumSearchComponent,
    data: {
        heading: '',
    }
}];
