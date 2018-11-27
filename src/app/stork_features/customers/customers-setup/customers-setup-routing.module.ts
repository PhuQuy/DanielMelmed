import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersSetupComponent } from "app/stork_features/customers/customers-setup/customers-setup.component";
const routes: Routes = [
  {
    path: '',
    component: CustomersSetupComponent,
    data: {
      title: 'CustomersSetup'
    },
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersSetupRoutingModule {}
