import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { TareasService } from '../../services/tareas.service';
import { Preferences } from '@capacitor/preferences';
import * as EventEmitter from 'events';
import { Tarea } from '../../interfaces/Tarea';
import { InfoRegistrarTareaComponent } from '../../components/info-registrar-tarea/info-registrar-tarea.component';
import { Categoria } from '../../interfaces/Categoria';
import { CategoriaService } from '../../services/categoria.service';
import { ListadoTareasComponent } from '../../components/listado-tareas/listado-tareas.component';

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
  categorias:Categoria[]=[];

  constructor(private modalCtrl: ModalController,
              private tareasService: TareasService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private categoriaService: CategoriaService
    ) {}

  async ngOnInit(){
    await this.presentLoading()
    let storage = await Preferences.get({key: 'session'});
    let objetoStorage =  JSON.parse(storage.value!);
    
    this.tipoSesion = objetoStorage.tipoSesion;

    this.idUsuario = objetoStorage.idUsuario

    this.categoriaService.getCategorias('/api/Categoria/listarCategoria').subscribe(resp=>{
      this.categorias = resp.objeto;
    })
    
    this.tareasService.getTareas().subscribe(resp => {
      this.listaTareas = resp.filter(tarea =>{
        let existePostulante = this.tareasService.verificarPostulante(tarea.id, this.idUsuario)
        
        if (existePostulante && tarea.estado === 'publicado') {
          return tarea;
        } else {
          return null;
        }
        
      })
      this.loading.dismiss();
    })
    
  }

  async registrarTarea(){
    const modal = await this.modalCtrl.create({
      component: InfoRegistrarTareaComponent,
      componentProps:{
        listaCategoria: this.categorias
      }
    });
    await modal.present();
  }

  async listarTareas(){
    const modal = await this.modalCtrl.create({
      component: ListadoTareasComponent,
    });
    await modal.present();
    
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Procesando...',
      duration: 2
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
