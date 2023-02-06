import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { TipoSesionComponent } from './tipo-sesion/tipo-sesion.component';
import { ListaTareaComponent } from './lista-tarea/lista-tarea.component';
import { RevisarPostulantesComponent } from './revisar-postulantes/revisar-postulantes.component';
import { DetalleTareaComponent } from './detalle-tarea/detalle-tarea.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';



@NgModule({
  declarations: [
    HeaderComponent,
    TipoSesionComponent,
    ListaTareaComponent,
    RevisarPostulantesComponent,
    DetalleTareaComponent,
    DetalleUsuarioComponent
  ],
  exports:[
    HeaderComponent,
    TipoSesionComponent,
    ListaTareaComponent,
    RevisarPostulantesComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
