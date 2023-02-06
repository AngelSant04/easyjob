import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from '../../interfaces/Usuario';
import { TareasService } from '../../services/tareas.service';
import { UsuariosService } from '../../services/usuarios.service';
import { DetalleUsuarioComponent } from '../detalle-usuario/detalle-usuario.component';

@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.component.html',
  styleUrls: ['./detalle-tarea.component.scss'],
})
export class DetalleTareaComponent implements OnInit {
  @Input() usuarios: Usuario[] = [];
  @Input() idTarea: string ='';
  
  constructor(private modalCtrl:ModalController,
              private tareasService: TareasService,
              private usuariosService:UsuariosService
    ) { }

  
  ngOnInit() {
    
  }

  cancel() {
     return this.modalCtrl.dismiss();
  }

  async verMas(user:Usuario){
    const modal = await this.modalCtrl.create({
      component: DetalleUsuarioComponent,
      componentProps: {
        usuario: user,
        idTarea: this.idTarea
      }
    });
    await modal.present();
    
  }
}
