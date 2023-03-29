import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab4Page } from './tab4.page';
import { GestionComponent } from './categoria/gestion.component';


const routes: Routes = [
  {
    path: '',
    component: Tab4Page
  },
  {
    path:'categoria',
    component: GestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab4PageRoutingModule {}
