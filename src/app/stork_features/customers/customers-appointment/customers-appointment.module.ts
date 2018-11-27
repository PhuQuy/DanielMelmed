import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CustomersAppointmentComponent } from "app/stork_features/customers/customers-appointment/customers-appointment.component";
import { CustomersAppointmentRoutingModule } from "app/stork_features/customers/customers-appointment/customers-appointment-routing.module";
import { MatFormFieldModule, MatTableModule, MatInputModule, MatSortModule, MatPaginatorModule } from "@angular/material";

@NgModule({
  imports: [
  CustomersAppointmentRoutingModule,
     RouterModule,
    HttpModule,
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    
  ],
  declarations: [
 CustomersAppointmentComponent 

  
  ]
})
export class CustomersAppointmentModule { }
