import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AppointmentsComponent } from 'app/stork_features/appointments/appointments.component';

const routes: Routes = [
  {
    path: '',
    component: AppointmentsComponent,
    data: {
      title: 'Appointments'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule {}
