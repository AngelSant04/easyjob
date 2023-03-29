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
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { ListadoTareasComponent } from './listado-tareas/listado-tareas.component';
import { InfoRegistrarTareaComponent } from './info-registrar-tarea/info-registrar-tarea.component';
import { ListadoCategoriasComponent } from './listado-categorias/listado-categorias.component';
@NgModule({
  declarations: [
    HeaderComponent,
    TipoSesionComponent,
    ListaTareaComponent,
    RevisarPostulantesComponent,
    DetalleTareaComponent,
    DetalleUsuarioComponent,
    ListaTareaComponent,
    AntecedenteComponent,
    PerfilComponent,
    ListadoTareasComponent,
    InfoRegistrarTareaComponent,
    ListadoCategoriasComponent
  ],
  exports:[
    HeaderComponent,
    TipoSesionComponent,
    ListaTareaComponent,
    RevisarPostulantesComponent,
    ListadoTareasComponent,
    InfoRegistrarTareaComponent,
    ListadoCategoriasComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule,
    FormsModule
  ]
})
export class ComponentsModule { }
