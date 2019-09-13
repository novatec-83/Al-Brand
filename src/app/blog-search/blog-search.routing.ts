import { Routes } from '@angular/router';
import {BlogosphereSearchComponent} from "./blog-search.component";

export const BlogosphereSearchRoutes: Routes = [{
    path: '',
    component: BlogosphereSearchComponent,
    data: {
        heading: '',
    }
}];
