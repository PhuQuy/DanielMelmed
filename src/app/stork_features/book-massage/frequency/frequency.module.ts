import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FrequencyComponent } from "app/stork_features/book-massage/frequency/frequency.component";
import { FrequencyRoutingModule } from "app/stork_features/book-massage/frequency/frequency-routing.module";






@NgModule({
  imports: [
 
    RouterModule,
    HttpModule,
    CommonModule,
  FrequencyRoutingModule
  
  
  ],
  declarations: [ ]
})
export class FrequencyModule { }
