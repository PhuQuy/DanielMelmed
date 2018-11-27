import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppointmentseditComponent } from 'app/stork_features/appointmentsedit/appointmentsedit.component';
import { AppointmentseditRoutingModule } from 'app/stork_features/appointmentsedit/appointmentsedit-routing.module';
import { MatDatepickerModule, MatNativeDateModule, MatTooltipModule } from '@angular/material';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { ControlMessagesComponent } from "app/stork_features/appointmentsedit/appointmentsedit-control-messages.component";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    AppointmentseditRoutingModule,
    ChartsModule,
    BsDropdownModule,
    RouterModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatTooltipModule,    
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatetimepickerModule,
    MatMomentDatetimeModule
  ],
  declarations: [ AppointmentseditComponent,ControlMessagesComponent ],
 
})
export class AppointmentseditModule { }
