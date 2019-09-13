import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {AlertComponent} from './_directives';
import {DashboardLayoutComponent} from "./dashboard-layout/dashboard-layout.component";
import {RouterModule} from '@angular/router';
import {SlimLoadingBarModule} from "ng2-slim-loading-bar";
import {AppRoutes} from './app.routing';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {HeaderComponent} from "./userdashboard-template/header.component";
import {SideMenuComponent} from "./userdashboard-template/side-menu.component";
import { AppComponent } from './app.component';
import { TextMaskModule } from 'angular2-text-mask';
import {PreloaderModule} from "./components/preloader.module";
import {GetpaymentComponent} from './get-payment/getpayment.component';
import {RegisterComponent} from './register/register.component';
import {RecapchaModule} from './recapcha/recapcha.module';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatRippleModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';
import {ConfirmPasswordComponent} from './confirm-password/confirm-password.component';
import {AuthGuard} from './_guards';
import {PushNotificationsService} from 'angular2-notifications/dist';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideMenuComponent,
    GetpaymentComponent,
    RegisterComponent,
    ConfirmPasswordComponent,
    AlertComponent,
    DashboardLayoutComponent
  ],
  imports: [
    BrowserModule,
    SlimLoadingBarModule,
    PreloaderModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    RecapchaModule,
    TextMaskModule,
    MatCardModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatTableModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule
  ],
  providers: [AuthGuard, PushNotificationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
