import { Routes } from '@angular/router';
import {LinkedinSearchComponent} from "./linkedin-search.component";

export const LinkedinSearchRoutes: Routes = [{
    path: '',
    component: LinkedinSearchComponent,
    data: {
        heading: '',
    }
}];
