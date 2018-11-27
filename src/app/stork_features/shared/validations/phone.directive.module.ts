import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MyCurrencyFormatterDirective } from "app/stork_features/shared/validations/phone.directive";

@NgModule({
  imports: [
    ChartsModule,
    RouterModule,
    HttpModule,
    CommonModule,
  
  ],
  declarations: [ MyCurrencyFormatterDirective ],
 
})
export class PhoneDirectiveModule { }
