import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CustomersSetupComponent } from "app/stork_features/customers/customers-setup/customers-setup.component";
import { CustomersSetupRoutingModule } from "app/stork_features/customers/customers-setup/customers-setup-routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import {  MatTooltipModule,  } from '@angular/material';

@NgModule({
  imports: [
    RouterModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    MatTooltipModule,
    CustomersSetupRoutingModule
  ],
  declarations: [
    CustomersSetupComponent,
  ]
})
export class CustomersSetupModule { }
