import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { RegionsSubregionsComponent } from "app/stork_features/configuration/regions-subregions/regions-subregions.component";
import { RegionsSubregionsRoutingModule } from "app/stork_features/configuration/regions-subregions/regions-subregions-routing.module";
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatTooltipModule, MatPaginatorModule, MatSortModule, MatIconModule } from '@angular/material';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ControlMessagesComponent } from "app/stork_features/configuration/regions-subregions/region-subregions-control-messages.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from "ngx-loading";
@NgModule({
  imports: [
    RouterModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RegionsSubregionsRoutingModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ModalModule,
    HttpClientModule, MatIconModule,
    LoadingModule
  ],
  declarations: [
    RegionsSubregionsComponent,
    ControlMessagesComponent

  ]
})
export class RegionsSubregionsModule { }
