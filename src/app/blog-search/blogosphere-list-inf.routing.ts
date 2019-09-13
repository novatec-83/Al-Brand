import { Routes } from '@angular/router';
import {BlogosphereListInfComponent} from "./blogosphere-list-inf.component";
// import {BlogosphereListInfComponent} from "./BlogosphereListInf.component";

// import {Yout} from "./searchpage.component";


export const BlogosphereListInfRoutes: Routes = [{
    path: '',
    component: BlogosphereListInfComponent,
    data: {
        heading: '',
        // removeFooter: true
    }
}];
