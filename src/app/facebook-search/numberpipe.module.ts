import {CommonModule } from '@angular/common'
import {NumbersPipe} from './numbers-pipe';
import {NgModule} from "@angular/core";





@NgModule({
    declarations: [
        NumbersPipe
    ],
    imports: [
        CommonModule
    ],
    exports:[
        NumbersPipe
    ],
    providers: [NumberpipeModule]

})
export class NumberpipeModule { }