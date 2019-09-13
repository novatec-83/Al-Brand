import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {DashboardRoutes} from "./userdashboard.routing";
import {LoaderModule} from '../loader/loader.module';
import {UserdashboardTemplateComponent} from "./userdashboard-template.component";
import {MatSelectModule, MatTabsModule,  MatListModule, MatTableModule,
  MatCardModule, MatFormFieldModule, MatInputModule, MatRippleModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {PreloaderModule} from "../components/preloader.module";
import {CdkTableModule} from '@angular/cdk/table';


import {} from '@angular/material';


@NgModule({
    imports: [CommonModule,
        LoaderModule,RouterModule.forChild( DashboardRoutes ),FormsModule, CdkTableModule,
      MatSelectModule, MatTabsModule,  MatListModule, MatTableModule,
      MatCardModule, MatFormFieldModule, MatInputModule, MatRippleModule,PreloaderModule,],
    declarations: [ UserdashboardTemplateComponent ]
})

export class UserDashboardModule {

}
