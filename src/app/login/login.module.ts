import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import {PreloaderModule} from '../components/preloader.module';
import {LoginComponent} from "./login.component";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule, MatInputModule, MatIconModule, MatCheckboxModule, MatSlideToggleModule} from '@angular/material';
import {RecapchaModule} from '../recapcha/recapcha.module';
import {LoginRoutes} from "./login.routing";
// import {LoaderModule} from '../loader/loader.module';

@NgModule({
    imports: [
        CommonModule, RecapchaModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatIconModule,
        MatSlideToggleModule,
        // LoaderModule,
        MatCheckboxModule,
        PreloaderModule, RouterModule.forChild(LoginRoutes),FormsModule],
    exports: [MatIconModule, MatInputModule, MatCheckboxModule, MatFormFieldModule],
    declarations: [LoginComponent]
})

export class LoginModule { }
