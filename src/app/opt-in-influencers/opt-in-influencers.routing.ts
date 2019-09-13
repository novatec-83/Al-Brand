import { Routes } from '@angular/router';

import {OptInInfluencersComponent} from "./opt-in-influencers.component";

// import {Sea} from "./influencers-datatable.component";


export const OptInInfluencersRoutes: Routes = [{
    path: '',
    component: OptInInfluencersComponent,
    data: {
        heading: '',
        // removeFooter: true
    }
}];
