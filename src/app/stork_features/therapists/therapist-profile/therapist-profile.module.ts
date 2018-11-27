import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { TherapistProfileComponent } from "app/stork_features/therapists/therapist-profile/therapist-profile.component";
import { TherapistsProfileRoutingModule } from "app/stork_features/therapists/therapist-profile/therapist-profile-routing.modules";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ControlMessagesComponent } from "app/stork_features/therapists/therapist-profile/therapist-control-messages.component";
import { PhonePipe } from '../../shared/validations/phone.pipe';
import { MatTabsModule } from '@angular/material'; 

@NgModule({
  imports: [
    RouterModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TherapistsProfileRoutingModule,
    MatTabsModule
  ],
  declarations: [
    TherapistProfileComponent,
    ControlMessagesComponent
  ]
})
export class TherapistsProfileModule { }
