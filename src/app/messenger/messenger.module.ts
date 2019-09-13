import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {FormsModule} from "@angular/forms";
import {MessengerComponent} from "./messenger.component";
import {MessengerRoutes} from "./messenger.routing";
import {MomentModule} from "angular2-moment";
import {ServerSocket} from "./chat-socket.service";
import {WebSocketService} from "angular2-websocket-service";
// import {TimeAgoPipe} from "time-ago-pipe";

@NgModule({
    imports: [CommonModule, RouterModule.forChild(MessengerRoutes),FormsModule,MomentModule
    ],
    declarations: [MessengerComponent],
    providers:[WebSocketService,ServerSocket]
})

export class MessengerModule { }
