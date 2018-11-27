import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertNotificationSetupComponent } from './alert-notification-setup.component';

const routes: Routes = [
   {
    path: '',
    component: AlertNotificationSetupComponent,
    data: {
      title: 'Configuration'
    },
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertNotificationSetupRoutingModule { }
