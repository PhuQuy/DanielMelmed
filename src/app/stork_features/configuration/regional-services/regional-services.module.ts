import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ConfigurationSidebarComponent } from "app/stork_features/configuration/configuration-sidebar/configuration-sidebar.component";
import { RegionalServicesComponent } from "app/stork_features/configuration/regional-services/regional-services.component";
import { RegionalServicesRoutingModule } from "app/stork_features/configuration/regional-services/regional-services-routing.module";
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule,MatIconModule, MatTooltipModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ControlMessagesComponent } from "app/stork_features/configuration/regional-services/region-services-control-messages.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from "ngx-loading";

@NgModule({
  imports: [
    RouterModule,
    HttpModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    RegionalServicesRoutingModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    ModalModule,
    MatIconModule,
    LoadingModule
  ],
  declarations: [
    RegionalServicesComponent,
    ControlMessagesComponent

  ]
})
export class RegionalServicesModule { }
