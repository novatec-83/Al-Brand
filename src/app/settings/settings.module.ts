import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {FormsModule} from "@angular/forms";

import {PreloaderModule} from "../components/preloader.module";
import {SettingsComponent} from "./settings.component";
import {SettingsRoutes} from "./settings.routing";
import {MdInputModule} from "@angular/material";


@NgModule({
    imports: [CommonModule, RouterModule.forChild(SettingsRoutes),FormsModule,PreloaderModule,MdInputModule],
    declarations: [SettingsComponent]
})

export class SettingsModule { }
