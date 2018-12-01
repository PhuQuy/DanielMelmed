import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from './stork_layout/full-layout/full-layout.component';
import { AuthGuardService } from './core/guard/auth-guard.service';
// Import Containers


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'appointments',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: './stork_features/login/login.module#LoginModule'
    },

    {
        path: '',
        component: FullLayoutComponent,
        canActivate: [AuthGuardService],
        children: [

            {
              path: 'book-massage/appointment/:appointmentId',
              loadChildren: './stork_features/book-massage/appointment/appointment.module#AppointmentModule'
            },

            {
                path: 'appointments',
                loadChildren: './stork_features/appointments/appointments.module#AppointmentsModule',
            },
            {
                path: 'appointmentsedit',
                loadChildren: './stork_features/appointmentsedit/appointmentsedit.module#AppointmentseditModule'
            },

            {
                path: 'customers',
                loadChildren: './stork_features/customers/customers.module#CustomersModule'
            },

            {
                path: 'therapistsavailability',
                loadChildren: './stork_features/therapists-availability/therapists-availability.module#TherapistsAvailabilityModule'
            },
            // {
            //   path: 'configuration',
            //   loadChildren: './stork_features/configuration/configuration.module#ConfigurationModule'
            // },
            {
                path: 'therapists',
                loadChildren: './stork_features/therapists/therapists.module#TherapistsModule'
            },
            {
                path: 'customer/profile/:id',
                loadChildren: './stork_features/customers/customers-profile/customers-profile.module#CustomersProfileModule'

            },
            {
                path: 'customer/appointment/:id',
                loadChildren: './stork_features/customers/customers-appointment/customers-appointment.module#CustomersAppointmentModule'

            },
            {
                path: 'customer/setup/:id',
                loadChildren: './stork_features/customers/customers-setup/customers-setup.module#CustomersSetupModule'

            },
            {
                path: 'therapist/profile/:id',
                loadChildren: './stork_features/therapists/therapist-profile/therapist-profile.module#TherapistsProfileModule'

            },
            {
                path: 'therapist/appointment/:id',
                loadChildren: './stork_features/therapists/therapist-appointment/therapist-appointment.module#TherapistsAppointmentModule'

            },
            {
                path: 'therapist/setup/:id',
                loadChildren: './stork_features/therapists/therapist-setup/therapist-setup.module#TherapistSetupModule'

            }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
