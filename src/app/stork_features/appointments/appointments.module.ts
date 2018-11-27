import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppointmentsComponent } from 'app/stork_features/appointments/appointments.component';
import { AppointmentsRoutingModule } from 'app/stork_features/appointments/appointments-routing.module';
import { MatTooltipModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesComponent } from './appointments-control-messages-component';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

@NgModule({
  imports: [
    AppointmentsRoutingModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,        
    BsDropdownModule,
    RouterModule,
    MatTooltipModule, 
    MatDatetimepickerModule,       
    HttpModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,  
    AngularDateTimePickerModule,  
    MatMomentDatetimeModule
  ],
    
  declarations: [ AppointmentsComponent,
    ControlMessagesComponent ],
 
})
export class AppointmentsModule { }
