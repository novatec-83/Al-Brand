import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CustomPipePipe} from './CustomPipe.pipe';
@NgModule({
    imports: [CommonModule],
    declarations: [CustomPipePipe],
    exports: [CustomPipePipe]
})

export class CustomPipeModule { }
