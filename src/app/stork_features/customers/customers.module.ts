import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CustomersComponent } from 'app/stork_features/customers/customers.component';
import { CustomersRoutingModule } from 'app/stork_features/customers/customers-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule, MatTooltipModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesComponent } from "app/stork_features/customers/customer-control-messages.component";
import { ImageCropperComponent, ImageCropperModule } from 'ng2-img-cropper';
@NgModule({
  imports: [
    CustomersRoutingModule,
    ModalModule.forRoot(),
    FormsModule, 
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    CommonModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSortModule,
    ImageCropperModule


  ],
  declarations: [
    CustomersComponent,
    ControlMessagesComponent
  ]
})
export class CustomersModule { }
