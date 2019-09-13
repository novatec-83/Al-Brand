import { Routes } from '@angular/router';
import {FacebookSearchComponent} from "./facebook-search.component";

export const FacebookSearchRoutes: Routes = [{
    path: '',
    component: FacebookSearchComponent,
    data: {
        heading: '',
    }
}];
