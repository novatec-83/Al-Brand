import { Routes } from '@angular/router';
import {YoutubeListInfComponent} from "./youtube-list-inf.component";
// import {YoutubeListInfComponent} from "./YoutubeListInf.component";

// import {Yout} from "./searchpage.component";


export const YoutubeListInfRoutes: Routes = [{
    path: '',
    component: YoutubeListInfComponent,
    data: {
        heading: '',
        // removeFooter: true
    }
}];
