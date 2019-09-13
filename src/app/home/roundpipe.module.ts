import {CommonModule } from '@angular/common'
import {RoundPipe} from "./search.component";
import {NgModule} from "@angular/core";





@NgModule({
    declarations: [
        RoundPipe
    ],
    imports: [
        CommonModule
    ],
    exports:[
        RoundPipe
    ]
})
export class RoundpipeModule { }