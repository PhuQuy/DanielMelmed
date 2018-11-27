import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertNotificationTemplateRoutingModule } from './alert-notification-template-routing.module';
import { AlertNotificationTemplateComponent } from "app/stork_features/configuration/alert-notification-template/alert-notification-template.component";
import { MatTooltipModule,MatIconModule } from "@angular/material";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
      MatTooltipModule,
      FormsModule,
      ReactiveFormsModule,
      MatIconModule,
    AlertNotificationTemplateRoutingModule
  ],
  declarations: [AlertNotificationTemplateComponent]
})
export class AlertNotificationTemplateModule { }
