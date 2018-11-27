import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyInfoComponent } from "app/stork_features/configuration/company-info/company-info.component";
const routes: Routes = [
  {
    path: '',
    component: CompanyInfoComponent,
    data: {
      title: 'Configuration'
    },

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyInfoRoutingModule { }
