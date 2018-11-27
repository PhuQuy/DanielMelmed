import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { TherapistsRoutingModule } from "app/stork_features/therapists/therapists-routing.module";
import { TherapistsComponent } from "app/stork_features/therapists/therapists.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule, MatPaginatorModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { ControlMessagesComponent } from "app/stork_features/therapists/therapist-control-messages.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperComponent, ImageCropperModule } from 'ng2-img-cropper';
@NgModule({
  imports: [
    TherapistsRoutingModule,
    RouterModule,
    HttpModule,
    FormsModule, ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule,
    ImageCropperModule,
  ],
  declarations: [TherapistsComponent, ControlMessagesComponent]
})
export class TherapistsModule { }
