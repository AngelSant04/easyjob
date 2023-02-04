import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { InfoRegistrarTareaPage } from '../info-registrar-tarea/info-registrar-tarea.page';
import { TareasService } from '../../services/tareas.service';
import { ListadoTareasPage } from '../listado-tareas/listado-tareas.page';
import { Preferences } from '@capacitor/preferences';
import * as EventEmitter from 'events';
import { Tarea } from '../../interfaces/Tarea';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  loading:any;
  tipoSesion: string = '';
  tipoSegment:string = 'postulaciones';
  listaTareas: Tarea[] = [];
  idUsuario:string = '';

  constructor(private modalCtrl: ModalController,
              private tareasService: TareasService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController
    ) {}

  async ngOnInit(){
    let storage = await Preferences.get({key: 'session'});
    let objetoStorage =  JSON.parse(storage.value!);
    
    this.tipoSesion = objetoStorage.tipoSesion;

    this.idUsuario = objetoStorage.idUsuario
    
    this.tareasService.getTareas().subscribe(resp => {
      this.listaTareas = resp.filter(tarea =>{
        let existePostulante = this.tareasService.verificarPostulante(tarea.id, this.idUsuario)
        
        if (existePostulante && tarea.estado === 'publicado') {
          return tarea;
        } else {
          return null;
        }
        
      })
    })
    
  }

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

  async cambioSegment(e:any){

    switch (this.tipoSegment) {
      case 'postulaciones':
        this.tareasService.getTareas().subscribe(resp => {
          this.listaTareas = resp.filter(tarea =>{
            let existePostulante = this.tareasService.verificarPostulante(tarea.id, this.idUsuario)
            
            if (existePostulante && tarea.estado === 'publicado') {
              return tarea;
            } else {
              return null;
            }
            
          })
        })
        break;

      case 'tareasAceptadas':
        this.tareasService.getTareas().subscribe(resp => {
          this.listaTareas = resp.filter(tarea => tarea.idUserEmpleado === this.idUsuario && tarea.estado === 'en proceso')
        })
        break;
      
      case 'tareasFinalizadas':
        this.tareasService.getTareas().subscribe(resp => {
          this.listaTareas = resp.filter(tarea => tarea.idUserEmpleado === this.idUsuario && tarea.estado === 'finalizado')
        })
        break;
    }


  }

}
