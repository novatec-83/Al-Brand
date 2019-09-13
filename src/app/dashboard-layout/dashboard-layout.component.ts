import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl:'./dashboard-layout.component.html',
  styles: []
})
export class DashboardLayoutComponent implements OnInit {

  constructor() { }
    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

     closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
  ngOnInit() {
  }

}
