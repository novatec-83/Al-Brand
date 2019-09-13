import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {Error400Routes} from "./error400.routing";
import {Error400Component} from "./error400.component";

@NgModule({
    imports: [CommonModule, RouterModule.forChild(Error400Routes)],
    declarations: [Error400Component]
})

export class Error400Module { }
