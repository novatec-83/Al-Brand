import { Routes } from '@angular/router';
import {PeriscopeListInfComponent} from './periscope-list-inf.component';

export const PeriScopeListInfRoutes: Routes = [{
    path: '',
    component: PeriscopeListInfComponent,
    data: {
        heading: '',
        // removeFooter: true
    }
}];
