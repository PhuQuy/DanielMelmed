import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BookMassageComponent } from "app/stork_features/book-massage/book-massage.component";
import { BookMassageRoutingModule } from "app/stork_features/book-massage/book-massage-routing.module";
import { AppointmentComponent } from "app/stork_features/book-massage/appointment/appointment.component";
import { AppointmentModule } from "app/stork_features/book-massage/appointment/appointment.module";
import { FrequencyModule } from "app/stork_features/book-massage/frequency/frequency.module";
import { AppointmentLogModule } from "app/stork_features/book-massage/appointment-log/appointment-log.module";
import { AlertNotificationModule } from "app/stork_features/book-massage/alert-notification/alert-notification.module";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BookMassageHeaderComponent } from './bookmassage-header/bookmassage-header.component';
import { BookMassageSidebarComponent } from './bookmassage-sidebar/bookmassage-sidebar.component';

@NgModule({
  imports: [
    BookMassageRoutingModule,
    RouterModule,
    HttpModule,
    CommonModule,
    AppointmentModule,
    FrequencyModule,
    AppointmentLogModule,
    MatTooltipModule,
  ],
  declarations: [
    BookMassageComponent,
    BookMassageHeaderComponent,
    BookMassageSidebarComponent],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [BookMassageComponent]
})
export class BookMassageModule { }
