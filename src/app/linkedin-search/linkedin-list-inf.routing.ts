import { Routes } from '@angular/router';
import {LinkedinListInfComponent} from './linkedin-list-inf.component';

export const LinkedinListInfRoutes: Routes = [{
    path: '',
    component: LinkedinListInfComponent,
    data: {
        heading: '',
        // removeFooter: true
    }
}];
