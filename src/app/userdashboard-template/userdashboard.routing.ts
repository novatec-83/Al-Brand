import { Routes } from '@angular/router';
import {UserdashboardTemplateComponent} from "./userdashboard-template.component";

// import { TaskboardComponent } from './taskboard.component';

export const DashboardRoutes: Routes = [{
    path: '',
    component: UserdashboardTemplateComponent,
    data: {
        heading: 'Dashboard',
        // removeFooter: true
    }
}];
