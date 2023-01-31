import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoSesionPage } from './tipo-sesion.page';

const routes: Routes = [
  {
    path: '',
    component: TipoSesionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoSesionPageRoutingModule {}
