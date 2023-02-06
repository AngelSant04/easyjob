import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Tarea } from '../../interfaces/Tarea';
import { Preferences } from '@capacitor/preferences';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-revisar-postulantes',
  templateUrl: './revisar-postulantes.component.html',
  styleUrls: ['./revisar-postulantes.component.scss'],
})
export class RevisarPostulantesComponent implements OnInit {

  tareas: Tarea[] = [];
  idUsuario:string = '';
  loading: any;

  constructor(private modalCtrl: ModalController,
              private tareasService: TareasService,
              private loadingCtrl: LoadingController,
    ) { }

  async ngOnInit() {
    await this.presentLoading()
    let storage = await Preferences.get({key: 'session'});
    let objetoStorage =  JSON.parse(storage.value!);

    this.idUsuario = objetoStorage.idUsuario;
    
    this.tareasService.getTareas().subscribe(resp => {
      this.tareas = resp.filter(tarea =>{
        let existePostulantes = this.tareasService.existePostulantes(tarea.id)
        
        if (existePostulantes && tarea.estado === 'publicado' && tarea.idUserEmpleador == this.idUsuario) {
          return tarea;
        } else {
          return null;
        }
        
      })
      this.loading.dismiss();
    })
  }

  cancel() {
    return this.modalCtrl.dismiss();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 20000
    });
    await this.loading.present();
  }

}
