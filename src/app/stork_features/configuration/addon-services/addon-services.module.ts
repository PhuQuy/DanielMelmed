import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AddonServicesComponent } from "app/stork_features/configuration/addon-services/addon-services.component";
import { AddonServicesRoutingModule } from "app/stork_features/configuration/addon-services/addon-services-routing.module";
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatTooltipModule, MatPaginatorModule, MatSortModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesComponent } from "app/stork_features/configuration/addon-services/addon-control-messages.component";
import { LoadingModule } from "ngx-loading";
@NgModule({
  imports: [
    RouterModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    AddonServicesRoutingModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    LoadingModule
   

  ],
  declarations: [
    AddonServicesComponent,
    ControlMessagesComponent,
   

  ]
})
export class AddonServicesModule { }
