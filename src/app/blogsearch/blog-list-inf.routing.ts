import { Routes } from '@angular/router';
import {BlogListInfComponent} from "./blog-list-inf.component";
// import {BlogListInfComponent} from "./BlogListInf.component";

// import {Yout} from "./searchpage.component";


export const BlogListInfRoutes: Routes = [{
    path: '',
    component: BlogListInfComponent,
    data: {
        heading: '',
        // removeFooter: true
    }
}];
