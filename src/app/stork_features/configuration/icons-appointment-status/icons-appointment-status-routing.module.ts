import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IconsAppointmentStatusComponent } from "app/stork_features/configuration/icons-appointment-status/icons-appointment-status.component";

const routes: Routes = [
   {
    path: '',
    component: IconsAppointmentStatusComponent,
    data: {
      title: 'Configuration'
    },
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconsAppointmentStatusRoutingModule { }
