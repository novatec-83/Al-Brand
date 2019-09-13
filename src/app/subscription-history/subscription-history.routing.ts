import { Routes } from '@angular/router';
import {SubscriptionHistoryComponent} from './subscription-history.component';

export const SubscriptionHistoryRoutes: Routes = [{
    path: '',
    component: SubscriptionHistoryComponent,
    data: {
        heading: '',
        // removeFooter: true
    }
}];
