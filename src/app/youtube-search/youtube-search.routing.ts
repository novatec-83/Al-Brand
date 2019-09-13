import { Routes } from '@angular/router';
import {YoutubeSearchComponent} from "./youtube-search.component";

export const YoutubeSearchRoutes: Routes = [{
    path: '',
    component: YoutubeSearchComponent,
    data: {
        heading: '',
    }
}];
