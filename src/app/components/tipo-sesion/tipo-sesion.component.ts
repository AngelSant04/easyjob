import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Usuario } from '../../interfaces/Usuario';

@Component({
  selector: 'app-tipo-sesion',
  templateUrl: './tipo-sesion.component.html',
  styleUrls: ['./tipo-sesion.component.scss'],
})
export class TipoSesionComponent implements OnInit {
  @Input() usuario!:Usuario;
  selectedEmpleado: boolean = false;
  selectedEmpleador: boolean = false;
  tipoSesion:string='';
  constructor(private modalCtrl:ModalController,private alertCtrl: AlertController) {}

  ngOnInit() {}

  seleccionarEmpleado(tipo:string) {
    this.tipoSesion=tipo;
    this.selectedEmpleado = true;
    this.selectedEmpleador=false;
  }
  seleccionarEmpleador(tipo:string) {
    this.tipoSesion=tipo;
    this.selectedEmpleado = false;
    this.selectedEmpleador=true;
  }
  async finalizar(){
    if(this.selectedEmpleado || this.selectedEmpleador){
      this.modalCtrl.dismiss({
        sesion:this.tipoSesion
       });
    }else{
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: `Debe Seleccionar un Tipo de Usuario` ,
        buttons: ['Ok'],
      });
      await alert.present();
    }
  
  }
}
