import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InfoRegistrarTareaPage } from '../info-registrar-tarea/info-registrar-tarea.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private modalCtrl: ModalController) {}

  async registrarTarea(){
    const modal = await this.modalCtrl.create({
      component: InfoRegistrarTareaPage,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss()
    console.log(data);
    
  }

  listarTareas(){
    console.log("listar");
  }

}
