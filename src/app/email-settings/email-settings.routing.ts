import { Routes } from '@angular/router';
import {EmailSettingsComponent} from "./email-settings.component";
// import {PinterestSearchComponent} from "./pinterest-search.component";

export const EmailSettingsRoutes: Routes = [{
    path: '',
    component: EmailSettingsComponent,
    data: {
        heading: '',
    }
}];
