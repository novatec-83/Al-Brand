import { Routes } from '@angular/router';
import {TwitterListComponent} from "./twitter-list.component";


export const TwitterListRoutes: Routes = [{
    path: '',
    component: TwitterListComponent,
    data: {
        heading: '',
        // removeFooter: true
    }
}];
