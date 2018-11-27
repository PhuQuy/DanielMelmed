import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AppointmentComponent } from "app/stork_features/book-massage/appointment/appointment.component";

const routes: Routes = [
  {
    path: '',
    component: AppointmentComponent,
    data: {
      title: 'Book Massage'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule {}
