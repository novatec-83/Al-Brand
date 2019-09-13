import { Routes } from '@angular/router';
import {GenericSearchComponent} from "./generic-search.component";
// import {} from "./search.component";

// import {Sea} from "./influencers-datatable.component";


export const GenericSearchRoutes: Routes = [{
    path: '',
    component: GenericSearchComponent,
    data: {
        heading: '',
        // removeFooter: true
    }
}];
