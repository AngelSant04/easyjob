import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RevisarPostulantesComponent } from '../../components/revisar-postulantes/revisar-postulantes.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async revisarPostulantes() {
    const modal = await this.modalCtrl.create({
      component: RevisarPostulantesComponent,
    });
    await modal.present();
    
  }

}
