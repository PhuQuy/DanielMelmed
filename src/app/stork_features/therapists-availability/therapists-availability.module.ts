import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { TherapistsAvailabilityRoutingModule } from "app/stork_features/therapists-availability/therapists-availability-routing.module";
import { TherapistsAvailabilityComponent } from "app/stork_features/therapists-availability/therapists-availability.component";
import {SelectModule} from 'ng-select';

@NgModule({
  imports: [
 TherapistsAvailabilityRoutingModule,
    RouterModule,
    HttpModule,
    CommonModule,
 SelectModule
  
  ],
  declarations: [ TherapistsAvailabilityComponent]
})
export class TherapistsAvailabilityModule { }
