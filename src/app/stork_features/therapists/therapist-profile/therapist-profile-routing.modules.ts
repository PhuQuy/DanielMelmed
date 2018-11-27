import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { TherapistProfileComponent } from "app/stork_features/therapists/therapist-profile/therapist-profile.component";

const routes: Routes = [
  {
    path: '',
    component:  TherapistProfileComponent ,
    data: {
      title: 'Therapists'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TherapistsProfileRoutingModule {}