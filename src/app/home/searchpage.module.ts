import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {NgPipesModule} from 'ngx-pipes';
import {MatSelectModule,MatInputModule,
        MatAutocompleteModule,MatOptionModule,
        MatTabsModule,  MatListModule, MatTableModule } from "@angular/material";
import {AutoCompleteModule} from "primeng/primeng";
import {SearchpageComponent} from "./searchpage.component";
import {SearchPageRoutes} from "./searchpage.routing";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [CommonModule, MatSelectModule,MatInputModule,
      MatAutocompleteModule,MatOptionModule,ReactiveFormsModule, MatTabsModule,  MatListModule, MatTableModule, NgPipesModule,
        MatOptionModule, RouterModule.forChild(SearchPageRoutes),AutoCompleteModule,FormsModule],
    declarations: [SearchpageComponent]
})

export class SearchPageModule { }
