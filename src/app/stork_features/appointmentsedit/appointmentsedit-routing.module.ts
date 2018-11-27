import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AppointmentseditComponent } from 'app/stork_features/appointmentsedit/appointmentsedit.component';

const routes: Routes = [
  {
    path: '',
    component: AppointmentseditComponent,
    data: {
      title: 'Appointments'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentseditRoutingModule {}
