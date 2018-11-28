import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppointmentComponent } from "app/stork_features/book-massage/appointment/appointment.component";
import { AppointmentRoutingModule } from "app/stork_features/book-massage/appointment/appointment-routing.module";
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesComponent } from "app/stork_features/book-massage/appointment/appointment-control-messages.component";
import { MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatTableModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatDatetimepickerModule } from "@mat-datetimepicker/core";
import { MatMomentDatetimeModule } from "@mat-datetimepicker/moment";
import { MatTabsModule } from '@angular/material'; 
import { LoadingModule } from "ngx-loading";
import { ImageCropperComponent, ImageCropperModule } from 'ng2-img-cropper';
import { BookMassageSidebarComponent } from '../bookmassage-sidebar/bookmassage-sidebar.component';
import { AlertNotificationComponent } from '../alert-notification/alert-notification.component';
import { FrequencyComponent } from '../frequency/frequency.component';
import { AppointmentLogComponent } from '../appointment-log/appointment-log.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    RouterModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    AppointmentRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatetimepickerModule,
    MatMomentDatetimeModule,
    MatTabsModule,
    LoadingModule,
    ImageCropperModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    AngularDateTimePickerModule,  
    MatInputModule,
    NgSelectModule
  ],
  declarations: [AppointmentComponent, ControlMessagesComponent,AlertNotificationComponent,FrequencyComponent,AppointmentLogComponent]
})
export class AppointmentModule { }
