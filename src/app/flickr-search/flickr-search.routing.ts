import { Routes } from '@angular/router';
import {FlickrSearchComponent} from './flickr-search.component';

export const FlickrSearchRoutes: Routes = [{
    path: '',
    component: FlickrSearchComponent,
    data: {
        heading: '',
    }
}];
