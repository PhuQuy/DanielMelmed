import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { TherapistsAvailabilityComponent } from "app/stork_features/therapists-availability/therapists-availability.component";

const routes: Routes = [
  {
    path: '',
    component: TherapistsAvailabilityComponent,
    data: {
      title: 'TherapistsAvailability'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TherapistsAvailabilityRoutingModule {}
