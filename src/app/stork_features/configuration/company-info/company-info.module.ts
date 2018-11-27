import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CompanyInfoComponent } from "app/stork_features/configuration/company-info/company-info.component";
import { CompanyInfoRoutingModule } from "app/stork_features/configuration/company-info/company-info-routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PhonePipe } from '../../shared/validations/phone.pipe';
import { MyCurrencyFormatterDirective } from "app/stork_features/shared/validations/phone.directive";


@NgModule({
  imports: [
    RouterModule,
    HttpModule,
    CommonModule,
    CompanyInfoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule
  ],
  declarations: [
    CompanyInfoComponent
  
  ]
})
export class CompanyInfoModule { }
