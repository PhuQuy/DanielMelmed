import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersAppointmentComponent } from "app/stork_features/customers/customers-appointment/customers-appointment.component";

const routes: Routes = [
  {
    path: '',
    component: CustomersAppointmentComponent,
    data: {
      title: 'CustomersAppointment'
    },
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersAppointmentRoutingModule {}
