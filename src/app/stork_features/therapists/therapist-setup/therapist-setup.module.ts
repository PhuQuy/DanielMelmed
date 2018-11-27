import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { TherapistSetupComponent } from "app/stork_features/therapists/therapist-setup/therapist-setup.component";
import { TherapistSetupRoutingModule } from "app/stork_features/therapists/therapist-setup/therapist-setup-routing.module";
import { FormsModule ,ReactiveFormsModule} from "@angular/forms";
import {  ImageCropperModule } from 'ng2-img-cropper';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule,MatIconModule, MatTooltipModule, MatPaginatorModule, MatSortModule } from '@angular/material';
@NgModule({
  imports: [

    RouterModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    TherapistSetupRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,MatIconModule, MatTooltipModule, MatPaginatorModule, MatSortModule 
  ],
  declarations: [  TherapistSetupComponent]
})
export class TherapistSetupModule { }
