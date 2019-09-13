import { Routes } from '@angular/router';

import {InfluencersDatatableComponent} from "./influencers-datatable.component";


export const TwittercategoriesRoutes: Routes = [{
    path: '',
    component: InfluencersDatatableComponent,
    data: {
        heading: '',
        // removeFooter: true
    }
}];
