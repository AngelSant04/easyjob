import { Component } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { InfoRegistrarTareaPage } from '../info-registrar-tarea/info-registrar-tarea.page';
import { TareasService } from '../../services/tareas.service';
import { ListadoTareasPage } from '../listado-tareas/listado-tareas.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  loading:any;

  constructor(private modalCtrl: ModalController,
              private tareasService: TareasService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController
    ) {}

  async registrarTarea(){
    const modal = await this.modalCtrl.create({
      component: InfoRegistrarTareaPage,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss()
    
    if (data) {

      await this.presentLoading();
      await this.tareasService.agregarTarea(data.tarea).then(resp => {
        this.loading.dismiss();
      }).catch(e => {
        this.loading.dismiss();
        throw e;
      })
      const alert = await this.alertCtrl.create({
        header: 'Tarea Registrada',
        message: 'Tarea registrada exitosamente',
        buttons: ['OK'],
      });
      await alert.present();

    }
    
  }

  async listarTareas(){
    const modal = await this.modalCtrl.create({
      component: ListadoTareasPage,
    });
    await modal.present();
    
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Procesando...',
      duration: 20000
    });
    await this.loading.present();
  }

}
