import { Routes } from '@angular/router';
import {Blogsearchv2Component} from "./blogsearchv2.component";

export const Blogsearchv2Routes: Routes = [{
    path: '',
    component: Blogsearchv2Component,
    data: {
        heading: '',
    }
}];
