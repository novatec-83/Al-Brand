import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {FormsModule} from "@angular/forms";
import {ChangePasswordComponent} from "./change-password.component";
import {ChangePasswordRoutes} from "./change-password.routing";
import {PreloaderModule} from "../components/preloader.module";


@NgModule({
    imports: [CommonModule, RouterModule.forChild(ChangePasswordRoutes),FormsModule,PreloaderModule],
    declarations: [ChangePasswordComponent]
})

export class ChangePasswordModule { }
