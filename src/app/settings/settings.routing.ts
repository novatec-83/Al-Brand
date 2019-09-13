import { Routes } from '@angular/router';
import {SettingsComponent} from "./settings.component";
// import {SettingsComponent} from "./Settings.component";

export const SettingsRoutes: Routes = [{
    path: '',
    component: SettingsComponent,
    data: {
        heading: '',
    }
}];
