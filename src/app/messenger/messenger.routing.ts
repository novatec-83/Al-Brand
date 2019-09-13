import { Routes } from '@angular/router';
import {MessengerComponent} from "./messenger.component";



export const MessengerRoutes: Routes = [{
    path: '',
    component: MessengerComponent,
    data: {
        heading: '',
    }
}];
