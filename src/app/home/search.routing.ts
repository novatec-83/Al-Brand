import { Routes } from '@angular/router';
import {SearchComponent} from "./search.component";

// import {Sea} from "./influencers-datatable.component";


export const SearchRoutes: Routes = [{
    path: '',
    component: SearchComponent,
    data: {
        heading: '',
        // removeFooter: true
    }
}];
