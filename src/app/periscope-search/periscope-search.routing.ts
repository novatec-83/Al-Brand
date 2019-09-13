import { Routes } from '@angular/router';
import {PeriscopeSearchComponent} from './periscope-search.component';

export const PeriscopeSearchRoutes: Routes = [{
    path: '',
    component: PeriscopeSearchComponent,
    data: {
        heading: '',
    }
}];
