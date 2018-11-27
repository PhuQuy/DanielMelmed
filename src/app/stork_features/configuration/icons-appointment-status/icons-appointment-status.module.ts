import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsAppointmentStatusRoutingModule } from './icons-appointment-status-routing.module';
import { IconsAppointmentStatusComponent } from "app/stork_features/configuration/icons-appointment-status/icons-appointment-status.component";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatTooltipModule ,MatPaginatorModule,MatSortModule,MatIconModule} from '@angular/material';
import { ControlMessagesComponent } from "app/stork_features/configuration/icons-appointment-status/icon-appointment-control-messages.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { LoadingModule } from "ngx-loading";
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    ColorPickerModule,
    LoadingModule,
    IconsAppointmentStatusRoutingModule
  ],
  declarations: [IconsAppointmentStatusComponent,ControlMessagesComponent]
})
export class IconsAppointmentStatusModule { }
