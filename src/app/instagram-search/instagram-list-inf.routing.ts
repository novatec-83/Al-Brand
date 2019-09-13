import { Routes } from '@angular/router';
import {InstagramListInfComponent} from "./instagram-list-inf.component";

export const InstagramListInfRoutes: Routes = [{
    path: '',
    component: InstagramListInfComponent,
    data: {
        heading: '',
        // removeFooter: true
    }
}];
