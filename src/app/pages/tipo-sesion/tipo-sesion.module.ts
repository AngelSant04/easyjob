import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoSesionPageRoutingModule } from './tipo-sesion-routing.module';

import { TipoSesionPage } from './tipo-sesion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoSesionPageRoutingModule
  ],
  declarations: [TipoSesionPage]
})
export class TipoSesionPageModule {}
