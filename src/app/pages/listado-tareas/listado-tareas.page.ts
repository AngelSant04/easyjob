import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { TareasService } from 'src/app/services/tareas.service';
import { Tarea } from '../../interfaces/Tarea';
import { Preferences } from '@capacitor/preferences';
import { finalize } from 'rxjs';
import { InfoRegistrarTareaPage } from '../info-registrar-tarea/info-registrar-tarea.page';

@Component({
  selector: 'app-listado-tareas',
  templateUrl: './listado-tareas.page.html',
  styleUrls: ['./listado-tareas.page.scss'],
})
export class ListadoTareasPage implements OnInit {

  estadoTarea: string = 'publicado';
  tareas: Tarea[] = [];
  loading:any;
  tarea: Tarea = {
    id: '',
    idCategoria: '',
    descripcion: '',
    direccion: '',
    fechaCreacion: '',
    fechaRealizar: '',
    nombre: '',
    pago: 0,
    estado: '',
    idUserEmpleado: '',
    idUserEmpleador: ''
  };

  constructor(private modalCtrl: ModalController,
              private tareasService: TareasService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController
    ) { }

  async ngOnInit() {
    let storage = await Preferences.get({key: 'session'});
    let objetoStorage =  JSON.parse(storage.value!);
    await this.presentLoading()
    this.tareasService.getTareas().subscribe( resp => {
        this.tareas = resp.filter(e => e.estado === this.estadoTarea && e.idUserEmpleador === objetoStorage.idUsuario);
        this.loading.dismiss();
      }
    );    
    
  }

  cancel() {
    return this.modalCtrl.dismiss();
  }

  async cambiarEstado(evnt:any){

    let storage = await Preferences.get({key: 'session'});
    let objetoStorage =  JSON.parse(storage.value!);
    await this.presentLoading()
    this.tareasService.getTareas().subscribe( resp => {
        this.tareas = resp.filter(e => e.estado === evnt.detail.value && e.idUserEmpleador === objetoStorage.idUsuario);
        this.loading.dismiss();
      }
    );

  }

  async eliminar(id:string){
    
    if (id) {
      
      await this.presentLoading();

      await this.tareasService.borrarTarea(id).then(resp => {
        this.loading.dismiss();
      }).catch(e => {
        this.loading.dismiss();
        throw e;
      })
      const alert = await this.alertCtrl.create({
        header: 'Tarea Eliminada',
        message: 'Tarea eliminada exitosamente',
        buttons: ['OK'],
      });
      await alert.present();
    }
    
  }

  async editar(id:string){

    if (id) {
    
      this.tarea = this.tareas.find(e => e.id === id)!
      
      const modal = await this.modalCtrl.create({
        component: InfoRegistrarTareaPage,
        componentProps: {
          tarea: this.tarea
        }
      });
      await modal.present();

      const { data } = await modal.onWillDismiss()
      
    
      if (data) {

        await this.presentLoading();
        await this.tareasService.modificarTarea(data.tarea, data.tarea.id).then(resp => {
          this.loading.dismiss();
        }).catch(e => {
          this.loading.dismiss();
          throw e;
        })
        const alert = await this.alertCtrl.create({
          header: 'Tarea Modificada',
          message: 'Tarea modificada exitosamente',
          buttons: ['OK'],
        });
        await alert.present();

      }
      
    }
    
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Espere...',
      duration: 20000
    });
    await this.loading.present();
  }


}
