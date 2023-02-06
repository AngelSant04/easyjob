import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { TipoSesionComponent } from './tipo-sesion/tipo-sesion.component';
import { ListaTareaComponent } from './lista-tarea/lista-tarea.component';
import { RevisarPostulantesComponent } from './revisar-postulantes/revisar-postulantes.component';
import { DetalleTareaComponent } from './detalle-tarea/detalle-tarea.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { AntecedenteComponent } from './antecedente/antecedente.component';
import { SwiperModule } from 'swiper/angular';



@NgModule({
  declarations: [
    HeaderComponent,
    TipoSesionComponent,
    ListaTareaComponent,
    RevisarPostulantesComponent,
    DetalleTareaComponent,
    DetalleUsuarioComponent,
    ListaTareaComponent,
    AntecedenteComponent  
  ],
  exports:[
    HeaderComponent,
    TipoSesionComponent,
    ListaTareaComponent,
    RevisarPostulantesComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule
  ]
})
export class ComponentsModule { }
