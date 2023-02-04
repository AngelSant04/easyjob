import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { TipoSesionComponent } from './tipo-sesion/tipo-sesion.component';
import { ListaTareaComponent } from './lista-tarea/lista-tarea.component';



@NgModule({
  declarations: [
    HeaderComponent,
    TipoSesionComponent,
    ListaTareaComponent    
  ],
  exports:[
    HeaderComponent,
    TipoSesionComponent,
    ListaTareaComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
