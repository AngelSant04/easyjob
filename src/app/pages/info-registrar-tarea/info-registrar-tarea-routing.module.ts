import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoRegistrarTareaPage } from './info-registrar-tarea.page';

const routes: Routes = [
  {
    path: '',
    component: InfoRegistrarTareaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoRegistrarTareaPageRoutingModule {}
