import { Routes } from '@angular/router';
import {MediumListInfComponent} from './medium-list-inf.component';

export const MediumListInfRoutes: Routes = [{
    path: '',
    component: MediumListInfComponent,
    data: {
        heading: '',
        // removeFooter: true
    }
}];
