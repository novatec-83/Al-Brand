import { Routes } from '@angular/router';
import {InstagramSearchComponent} from "./instagram-search.component";

export const InstagramSearchRoutes: Routes = [{
    path: '',
    component: InstagramSearchComponent,
    data: {
        heading: '',
    }
}];
