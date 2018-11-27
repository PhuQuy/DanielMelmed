import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { TherapistSetupComponent } from "app/stork_features/therapists/therapist-setup/therapist-setup.component";


const routes: Routes = [
  {
    path: '',
    component: TherapistSetupComponent,
    data: {
      title: 'Therapists'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TherapistSetupRoutingModule {}
