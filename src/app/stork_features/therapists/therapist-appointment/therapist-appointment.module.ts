import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { TherapistAppointmentComponent } from "app/stork_features/therapists/therapist-appointment/therapist-appointment.component";
import { TherapistAppointmentRoutingModule } from "app/stork_features/therapists/therapist-appointment/therapist-appointment-routing.modules";
import { MatFormFieldModule, MatTableModule, MatInputModule, MatSortModule, MatPaginatorModule } from "@angular/material";



@NgModule({
  imports: [
    RouterModule,
    HttpModule,
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    TherapistAppointmentRoutingModule
  ],
  declarations: [TherapistAppointmentComponent]
})
export class TherapistsAppointmentModule { }
