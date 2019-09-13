import { Component, OnInit, AfterViewInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Config} from "../config";
import {HttpService} from "../services/http-service";
import {Headers, Response, Http} from '@angular/http';
import {ServerSocket} from "./chat-socket.service";
import {Subscription} from "rxjs/Subscription";
// import CurrentUser = gapi.auth2.CurrentUser;

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit, AfterViewInit {
    sender_msg:string = ' ';
    currentUser;
    chatUser;
  _messages = [];
  loaded = false;
  uid;
  from_messaes = {};
    img = 'data:image/png;base64,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';
    // private router: Router;
    private socketSubscription: Subscription;
  constructor(private activatedRoute: ActivatedRoute, private http: HttpService,private router: Router, private socket: ServerSocket,) {
      this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
      this.activatedRoute.queryParams.subscribe(params => {
          let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
          headers.append('Content-Type', 'application/json');
          let uid = params['uid'];
          this.http.get(Config.api + '/opt-in-hash/'+uid, {headers:headers}, 'full')
              .subscribe(res => {

                  console.log(res.json())
                  this.chatUser = res.json();
                  this.loaded=true;
                      this.socket.connect(uid);

                      this.socketSubscription = this.socket.outputStream.subscribe((message: any) => {
                          console.log('received message from server: ', message);
                          if(message.sender===1) {
                              this._messages.push(message)
                          }
                      });

                      // send message to server, if the socket is not connected it will be sent
                      // as soon as the connection becomes available thanks to QueueingSubject
                      // this.socket.send({text: 'arts', username: 'billubhai', token: this.currentUser.token});
                      // this.socket.send({
                      //     id: uid,
                      //     "command": "send",
                      //     // "room": data.join,
                      //     "message": 'From Your Brand',
                      //     token: this.currentUser.token,
                      //     username: 'billubhai'
                      // });
                      this.uid=uid;
                      $(function() {
                          $('.chat-settings .change-bg-color label').on('click', function() {
                              var color = $(this).data('color');

                              $('.messenger-message-container.from').each(function() {
                                  $(this).removeClass(function (index, css) {
                                      return (css.match (/(^|\s)bg-\S+/g) || []).join(' ');
                                  });

                                  $(this).addClass('bg-' + color);
                              });
                          });
                      });
              }
                  ,
                  error => {
                      // alert('error')
                      this.router.navigate(['page-not-found']);

                  });
          console.log(uid); // Print the parameter to the console.
      });
  }

  ngOnInit() {

    this._messages=[{sender:0, content:'Hello Abdullah',created_at:"2017-09-09T12:58:53.783186"},{sender:1, content:'G bhai',created_at:"2017-11-09T12:58:53.783186"}]

  }

  ngAfterViewInit() {
      // $(function() {
      //     $('.chat-settings .change-bg-color label').on('click', function() {
      //         var color = $(this).data('color');
      //
      //         $('.messenger-message-container.from').each(function() {
      //             $(this).removeClass(function (index, css) {
      //                 return (css.match (/(^|\s)bg-\S+/g) || []).join(' ');
      //             });
      //
      //             $(this).addClass('bg-' + color);
      //         });
      //     });
      // });
  }
  send_to_msg(e){
      if (e.keyCode == 13) {



         let new_msg = {
              from: 'Brand',
              date: Date.now(),
              subject: this.currentUser.first_name,
              avatar: this.currentUser['profile_image'],
              icon: 'info',
              iconClass: 'mat-text-accent',
              body: '<p>'+this.sender_msg+'</p>',
              tag: 'Clients',
              type: 'info',
              important: true,
              id: this.uid,
              "command": "send",
             // "room": data.join,
                 // "message": 'From Your Brand',
                sender:0,
              token: this.currentUser.token,
          };
          this.socket.send(new_msg);
          this._messages.push({created_at: Date.now(), sender: 0, content: this.sender_msg});
          this.sender_msg='';
      }
  }

}
