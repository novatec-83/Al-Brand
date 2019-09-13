import { Routes } from '@angular/router';

import {SearchpageComponent} from "./searchpage.component";


export const SearchPageRoutes: Routes = [{
    path: '',
    component: SearchpageComponent,
    data: {
        heading: '',
    }
}];
