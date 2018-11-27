import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FrequencyComponent } from "app/stork_features/book-massage/frequency/frequency.component";
import { AlertNotificationComponent } from "app/stork_features/book-massage/alert-notification/alert-notification.component";
import { AlertNotificationRoutingModule } from "app/stork_features/book-massage/alert-notification/alert-notification-routing.module";
import { MatCheckboxModule, MatTableModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    MatCheckboxModule,
    RouterModule,
    HttpModule,
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  AlertNotificationRoutingModule,
  
  ],
  declarations: [ AlertNotificationComponent]
})
export class AlertNotificationModule { }
