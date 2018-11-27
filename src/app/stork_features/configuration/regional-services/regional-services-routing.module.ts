import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegionalServicesComponent } from "app/stork_features/configuration/regional-services/regional-services.component";

const routes: Routes = [
  {
    path: '',
    component: RegionalServicesComponent,
    data: {
      title: 'Configuration'
    },
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionalServicesRoutingModule {}
