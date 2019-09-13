import { Routes } from '@angular/router';
// import {LinkedinListInfComponent} from './linkedin-list-inf.component';
import {PinterestListInfComponent} from './pinterest-list-inf.component';

export const PintersetListInfRoutes: Routes = [{
    path: '',
    component: PinterestListInfComponent,
    data: {
        heading: '',
        // removeFooter: true
    }
}];
