import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppointmentLogComponent } from "app/stork_features/book-massage/appointment-log/appointment-log.component";
import { AppointmentLogRoutingModule } from "app/stork_features/book-massage/appointment-log/appointment-log-routing.module";



@NgModule({
  imports: [
    
    RouterModule,
    HttpModule,
    CommonModule,
   AppointmentLogRoutingModule
  ],
  declarations: [  ]
})
export class AppointmentLogModule { }
