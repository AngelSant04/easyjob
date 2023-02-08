import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { TareasService } from '../../services/tareas.service';
import { Tarea } from '../../interfaces/Tarea';
import { Categoria } from '../../interfaces/Categoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-listado-tareas',
  templateUrl: './listado-tareas.component.html',
  styleUrls: ['./listado-tareas.component.scss'],
})
export class ListadoTareasComponent implements OnInit {

  loading:any;
  tareas: Tarea[] = [];
  estadoTarea: string = 'publicado';

  constructor(private modalCtrl:ModalController,
              private loadingCtrl:LoadingController,
              private tareasService:TareasService,
              private categoriaService:CategoriaService
    ) { }

  async ngOnInit() {

    await this.presentLoading()
    let storage = await Preferences.get({key: 'session'});
    let objetoStorage =  JSON.parse(storage.value!);
    this.tareasService.getTareas().subscribe( resp => {
        this.tareas = resp.filter(e => e.estado === this.estadoTarea && e.idUserEmpleador === objetoStorage.idUsuario);
      }
      );
    this.loading.dismiss();

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

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Postulando...',
      duration: 20000
    });
    await this.loading.present();
  }

}
