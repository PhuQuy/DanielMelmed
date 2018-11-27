import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegionsSubregionsComponent } from "app/stork_features/configuration/regions-subregions/regions-subregions.component";

const routes: Routes = [
  {
    path: '',
    component: RegionsSubregionsComponent,
    data: {
      title: 'Configuration'
    },

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionsSubregionsRoutingModule { }
