import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { TherapistsComponent } from "app/stork_features/therapists/therapists.component";

const routes: Routes = [
  {
    path: '',
    component: TherapistsComponent,
    data: {
      title: 'Therapists'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TherapistsRoutingModule {}
