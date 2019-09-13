import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from "./profile.component";
import {ProfileRoutes} from "./profile.routing";
import {FormsModule} from "@angular/forms";
import {PagerService} from "../_services/paginator.service";
import {MatCardModule, MatFormFieldModule} from '@angular/material';

@NgModule({
    imports: [CommonModule,MatCardModule, MatFormFieldModule, RouterModule.forChild(ProfileRoutes),FormsModule],
    declarations: [ProfileComponent],
    providers:[PagerService]
})

export class ProfileModule { }
