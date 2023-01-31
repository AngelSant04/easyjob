import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tipo-sesion',
  templateUrl: './tipo-sesion.component.html',
  styleUrls: ['./tipo-sesion.component.scss'],
})
export class TipoSesionComponent implements OnInit {
  imgProfile: string =
    'https://firebasestorage.googleapis.com/v0/b/storageeasyjob.appspot.com/o/images%2FPIERO%20SALAZAR%20PERFIL.jpg?alt=media&token=659d1532-860d-4624-a925-d961c4acc7da';
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
