import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AppointmentLogComponent } from "app/stork_features/book-massage/appointment-log/appointment-log.component";


const routes: Routes = [
  {
    path: '',
    component: AppointmentLogComponent,
    data: {
      title: 'Book Massage'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentLogRoutingModule {}
