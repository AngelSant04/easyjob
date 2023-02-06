import { Component, Input, OnInit } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import { Tarea } from '../../interfaces/Tarea';
import { Preferences } from '@capacitor/preferences';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { DetalleTareaComponent } from '../detalle-tarea/detalle-tarea.component';

@Component({
  selector: 'app-lista-tarea',
  templateUrl: './lista-tarea.component.html',
  styleUrls: ['./lista-tarea.component.scss'],
})
export class ListaTareaComponent implements OnInit {

  @Input() tareas: Tarea[] = [];
  loading:any;
  @Input() tipo: string = 'tab2';

  constructor(private tareasService: TareasService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController
    ) { }

  ngOnInit() {

  }

  async postular(id: string){

    await this.presentLoading()
    let storage = await Preferences.get({key: 'session'});
    let objetoStorage =  JSON.parse(storage.value!);

    let existePostulante = this.tareasService.verificarPostulante(id, objetoStorage.idUsuario)
    
    if (existePostulante) {
      this.loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Usted ya esta postulando',
        message: 'Usted se encuentra en la lista de postulantes a la tarea',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      this.tareasService.agregarPostulante(id, objetoStorage.idUsuario);
      this.loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Postulación Enviada',
        message: 'Postulaste a la tarea correctamente',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async verPostulantes(id: string){

    const modal = await this.modalCtrl.create({
      component: DetalleTareaComponent,
    });
    await modal.present();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Postulando...',
      duration: 20000
    });
    await this.loading.present();
  }

}
