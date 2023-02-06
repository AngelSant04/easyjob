import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from '../../interfaces/Usuario';

@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.component.html',
  styleUrls: ['./detalle-tarea.component.scss'],
})
export class DetalleTareaComponent implements OnInit {

  usuarios: Usuario[] = [];
  
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {

    

  }

  cancel() {
    return this.modalCtrl.dismiss();
  }
}
