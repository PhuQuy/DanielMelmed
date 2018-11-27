import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddonServicesComponent } from "app/stork_features/configuration/addon-services/addon-services.component";
const routes: Routes = [
  {
    path: '',
    component: AddonServicesComponent,
    data: {
      title: 'Configuration'
    },
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddonServicesRoutingModule {}
