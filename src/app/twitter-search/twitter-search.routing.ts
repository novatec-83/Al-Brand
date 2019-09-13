import { Routes } from '@angular/router';
import {TwitterSearchComponent} from "./twitter-search.component";

export const TwitterSearchRoutes: Routes = [{
    path: '',
    component: TwitterSearchComponent,
    data: {
        heading: '',
    }
}];
