import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { CustomersProfileComponent } from "app/stork_features/customers/customers-profile/customers-profile.component";
import { CustomersProfileRoutingModule } from "app/stork_features/customers/customers-profile/customers-profile.routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material'; 


@NgModule({
  imports: [
    RouterModule,
    HttpModule,
    CommonModule,
    FormsModule,
    CustomersProfileRoutingModule,
    ReactiveFormsModule,
    MatTabsModule
  ],
  declarations: [
    CustomersProfileComponent
  ]
})
export class CustomersProfileModule { }
