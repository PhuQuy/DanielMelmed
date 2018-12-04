import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from "app/stork_features/book-massage/appointment/appointment.component";
import { BookMassageComponent } from "app/stork_features/book-massage/book-massage.component";

const routes: Routes = [
    {
        path: '',
        component: BookMassageComponent,
        children: [
            {
                path: 'appointment',
                component: AppointmentComponent,
            },
            {
                path: 'appointment/:appointmentId',
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
