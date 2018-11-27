import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertNotificationTemplateComponent } from "app/stork_features/configuration/alert-notification-template/alert-notification-template.component";

const routes: Routes = [
   {
    path: '',
    component:    AlertNotificationTemplateComponent,

    data: {
      title: 'Configuration'
    },
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertNotificationTemplateRoutingModule { }
