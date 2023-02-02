import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoTareasPageRoutingModule } from './listado-tareas-routing.module';

import { ListadoTareasPage } from './listado-tareas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoTareasPageRoutingModule
  ],
  declarations: [ListadoTareasPage]
})
export class ListadoTareasPageModule {}
