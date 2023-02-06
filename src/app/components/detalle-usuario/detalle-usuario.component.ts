import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../interfaces/Usuario';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { TareasService } from '../../services/tareas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss'],
})
export class DetalleUsuarioComponent implements OnInit {

  @Input() usuario!: Usuario;
  @Input() idTarea: string = '';
  loading:any;

  constructor(private modaCtrl:ModalController,
              private loadingCtrl: LoadingController,
              private tareasService: TareasService,
              private alertCtrl: AlertController,
              private router: Router,
    ) { }

  ngOnInit() {
  }

  cancel() {
    return this.modaCtrl.dismiss();
  }

  async aceptarPostulante(idUsuario:string){
    await this.presentLoading()
    this.tareasService.agregarIdEmpleado(this.idTarea, idUsuario);
      this.loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Postulante Aceptado',
        message: 'Aceptaste a tu postulante correctamente',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.cancel()
            this.cancel()
          }
        }],
      });
    await alert.present();    
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Postulando...',
      duration: 20000
    });
    await this.loading.present();
  }

}
