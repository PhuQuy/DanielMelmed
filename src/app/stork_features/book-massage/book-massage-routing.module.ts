import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookMassageComponent } from "app/stork_features/book-massage/book-massage.component";
import { AppointmentComponent } from "app/stork_features/book-massage/appointment/appointment.component";
import { AppointmentLogComponent } from "app/stork_features/book-massage/appointment-log/appointment-log.component";
import { AlertNotificationComponent } from "app/stork_features/book-massage/alert-notification/alert-notification.component";
import { FrequencyComponent } from "app/stork_features/book-massage/frequency/frequency.component";

const routes: Routes = [
  {
    path: '',
    component: BookMassageComponent,
    children: [
      {
        path: 'book-massage/appointment',
        component: AppointmentComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookMassageRoutingModule { }
