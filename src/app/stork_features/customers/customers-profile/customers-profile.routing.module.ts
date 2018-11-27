import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersProfileComponent } from "app/stork_features/customers/customers-profile/customers-profile.component";
const routes: Routes = [
  {
    path: '',
    component: CustomersProfileComponent,
    data: {
      title: 'CustomersProfile'
    },
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersProfileRoutingModule {}
