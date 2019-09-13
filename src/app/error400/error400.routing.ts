import { Routes } from '@angular/router';
import {Error400Component} from "./error400.component";



export const Error400Routes: Routes = [{
    path: '',
    component: Error400Component,
    data: {
        heading: '',
    }
}];
