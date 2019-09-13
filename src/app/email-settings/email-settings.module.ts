import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Select2Module } from 'ng2-select2';

import {EmailSettingsRoutes} from "./email-settings.routing";

import {FormsModule,ReactiveFormsModule} from "@angular/forms";

import {PagerService} from "../_services/paginator.service";

import {EmailSettingsComponent} from "./email-settings.component";
import {AddEmailComponent, AddEmailDialog} from "./add-email.component";
import {FroalaEditorModule} from "angular-froala-wysiwyg";
import {MdButtonModule, MdDialogModule, MdInputModule, MdSelectModule} from "@angular/material";

@NgModule({
    imports: [CommonModule, RouterModule.forChild(EmailSettingsRoutes),Select2Module,MdDialogModule,MdSelectModule,MdInputModule,MdButtonModule,FroalaEditorModule,ReactiveFormsModule,FormsModule],
    declarations: [EmailSettingsComponent,AddEmailDialog,AddEmailComponent],
    entryComponents:[AddEmailDialog],
    providers:[PagerService]
})

export class EmailSettingsModule { }
