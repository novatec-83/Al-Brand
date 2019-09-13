import { Routes } from '@angular/router';
import {UpdatePassComponent} from "./update-pass.component";

export const UpdatePassRoutes: Routes = [{
    path: '',
    component: UpdatePassComponent,
    data: {
        heading: '',
    }
}];
