import { Injectable } from '@angular/core'
import { QueueingSubject } from 'queueing-subject'
import { Observable } from 'rxjs/Observable'
import { WebSocketService } from 'angular2-websocket-service'
import { Config } from '../config';
@Injectable()
export class ServerSocket {
    private inputStream: QueueingSubject<any>
    public outputStream: Observable<any>

    constructor(private socketFactory: WebSocketService) {}

    public connect(room:string) {
        if (this.outputStream)
            return this.outputStream;

        // Using share() causes a single websocket to be created when the first
        // observer subscribes. This socket is shared with subsequent observers
        // and closed when the observer count falls to zero.
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return this.outputStream = this.socketFactory.connect(
            // 'wss://influexpapi.herokuapp.com/user?token='+currentUser.token,
            // 'wss://www.influexp.com/user?token='+currentUser.token,
            // 'ws://127.0.0.1:8000/user?token='+currentUser.token,
            'wss://apis.influexpai.com/chat/'+room+'?token='+currentUser.token,
            // 'ws://127.0.0.1:8000/chat/'+room+'?token='+currentUser.token,
            // 'ws://ns519750.ip-158-69-23.net:7000/user?token='+currentUser.token,
            // 'ws://ns519750.ip-158-69-23.net:7000/user?token='+currentUser.token,
            // 'ws://www.influexpai.com/user?token='+currentUser.token,

            this.inputStream = new QueueingSubject<any>()
        ).share()
    }
//{"text":"arts","username":"billubhai","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InVtYXIuYmlsYWxAYnJhaW5wbG93LmNvbSIsInVzZXJuYW1lIjoidW1hcmJpbGFsIiwib3JpZ19pYXQiOjE1MDMzOTU1NTMsImV4cCI6MTUwMzM5NTg1M30.5xZYL_1HOoIiRwRlF1NTZ-lxQRwKLlXh_Yx9RTaMPCg", "reply_channel": "daphne.response.AAQmKyGsKy!IswczdEfzo", "search": "arts"}
//{"text":"arts","username":"billubhai","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InVtYXIuYmlsYWxAYnJhaW5wbG93LmNvbSIsInVzZXJuYW1lIjoidW1hcmJpbGFsIiwib3JpZ19pYXQiOjE1MDMzOTU1NTMsImV4cCI6MTUwMzM5NTg1M30.5xZYL_1HOoIiRwRlF1NTZ-lxQRwKLlXh_Yx9RTaMPCg", "reply_channel": "daphne.response.SXxumKHGLS!KwVWgXFUdB", "search": "sports"}
//{"text":"arts","username":"billubhai","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InVtYXIuYmlsYWxAYnJhaW5wbG93LmNvbSIsInVzZXJuYW1lIjoidW1hcmJpbGFsIiwib3JpZ19pYXQiOjE1MDMzOTU1NTMsImV4cCI6MTUwMzM5NTg1M30.5xZYL_1HOoIiRwRlF1NTZ-lxQRwKLlXh_Yx9RTaMPCg", "reply_channel": "daphne.response.pMgDTMfkVY!xITJGlzarH", "search": "sports"}

    public send(message: any):void {
        // If the websocket is not connected then the QueueingSubject will ensure
        // that messages are queued and delivered when the websocket reconnects.
        // A regular Subject can be used to discard messages sent when the websocket
        // is disconnected.
        this.inputStream.next(message);
    }
}