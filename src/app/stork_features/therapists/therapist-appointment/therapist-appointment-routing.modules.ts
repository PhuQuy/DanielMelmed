import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { TherapistAppointmentComponent } from "app/stork_features/therapists/therapist-appointment/therapist-appointment.component";


const routes: Routes = [
  {
    path: '',
    component:  TherapistAppointmentComponent ,
    data: {
      title: 'Therapists'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TherapistAppointmentRoutingModule {}