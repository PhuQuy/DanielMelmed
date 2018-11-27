import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { FrequencyComponent } from "app/stork_features/book-massage/frequency/frequency.component";

const routes: Routes = [
  {
    path: '',
    component: FrequencyComponent,
    data: {
      title: 'Book Massage'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrequencyRoutingModule {}
