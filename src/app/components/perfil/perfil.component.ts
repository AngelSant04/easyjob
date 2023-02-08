import { Component, Input} from '@angular/core';
import { ModalController} from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/Usuario';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
  @Input() usuario!:Usuario;
  constructor(private modalCtrl: ModalController) { }
  volver() {
    return this.modalCtrl.dismiss();
  }
  diClick(){
    console.log('CLICK')
  }
}
