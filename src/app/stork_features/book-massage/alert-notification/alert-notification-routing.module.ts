import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AlertNotificationComponent } from "app/stork_features/book-massage/alert-notification/alert-notification.component";


const routes: Routes = [
  {
    path: '',
    component: AlertNotificationComponent,
    data: {
      title: 'Book Massage'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertNotificationRoutingModule {}
