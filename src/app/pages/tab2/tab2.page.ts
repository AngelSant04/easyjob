import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../interfaces/Categoria';
import { CategoriaService } from '../../services/categoria.service';
import { Tarea } from '../../interfaces/Tarea';
import { TareasService } from '../../services/tareas.service';
import { LoadingController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  listaCategoria: Categoria[] = [];
  listaTareas: Tarea[] = [];
  loading:any;
  idCategoria:string = '';
  tipoSesion: string = '';
  idUsuario:string='';

  constructor(private categoriaService: CategoriaService,
              private tareasService: TareasService,
              private loadingCtrl: LoadingController
    ) {}

  async ngOnInit() {

    let storage = await Preferences.get({key: 'session'});
    let objetoStorage =  JSON.parse(storage.value!);
    
    this.tipoSesion = objetoStorage.tipoSesion;

    this.idUsuario = objetoStorage.idUsuario;

    await this.presentLoading()
    this.categoriaService.getCategorias().subscribe((resp) => {
      this.listaCategoria = resp;
    });

    this.tareasService.getTareas().subscribe( resp => {
        this.listaTareas = resp.filter(e => e.idUserEmpleador != this.idUsuario && e.estado === 'publicado');
        this.loading.dismiss();
      }
    );
  }

  async cambiarCategoria(evnt:any){

    await this.presentLoading()
    this.tareasService.getTareas().subscribe( resp => {
        this.listaTareas = resp.filter(e => e.idUserEmpleador != this.idUsuario && e.idCategoria === this.idCategoria && e.estado === 'publicado');
        this.loading.dismiss();
      }
    );

  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 20000
    });
    await this.loading.present();
  }

}
