import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoRegistrarTareaPageRoutingModule } from './info-registrar-tarea-routing.module';

import { InfoRegistrarTareaPage } from './info-registrar-tarea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoRegistrarTareaPageRoutingModule,
  ],
  declarations: [InfoRegistrarTareaPage]
})
export class InfoRegistrarTareaPageModule {}
