import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatTooltipModule, MatPaginatorModule, MatSortModule, MatIconModule } from '@angular/material';
import { AlertNotificationSetupRoutingModule } from "app/stork_features/configuration/alert-notification-setup/alert-notification-setup-routing.module";
import { AlertNotificationSetupComponent } from "app/stork_features/configuration/alert-notification-setup/alert-notification-setup.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesComponent } from "app/stork_features/configuration/alert-notification-setup/alert-notification-control-messages.component";
import { LoadingModule } from "ngx-loading";
@NgModule({
  imports: [
    RouterModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    AlertNotificationSetupRoutingModule,
    LoadingModule
  ],
  declarations: [AlertNotificationSetupComponent, ControlMessagesComponent]
})
export class AlertNotificationSetupModule { }
