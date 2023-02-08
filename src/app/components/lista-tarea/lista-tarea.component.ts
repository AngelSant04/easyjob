import { Component, Input, OnInit } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import { Tarea } from '../../interfaces/Tarea';
import { Preferences } from '@capacitor/preferences';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { DetalleTareaComponent } from '../detalle-tarea/detalle-tarea.component';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../interfaces/Usuario';
import { Categoria } from '../../interfaces/Categoria';
import { CategoriaService } from '../../services/categoria.service';
import { InfoRegistrarTareaComponent } from '../info-registrar-tarea/info-registrar-tarea.component';

@Component({
  selector: 'app-lista-tarea',
  templateUrl: './lista-tarea.component.html',
  styleUrls: ['./lista-tarea.component.scss'],
})
export class ListaTareaComponent implements OnInit {

  @Input() tareas: Tarea[] = [];
  @Input() tipo: string = 'tab2';
  @Input() tipoSesion='empleado';
  categorias: Categoria[] = [];
  loading:any;

  constructor(private tareasService: TareasService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private userService: UsuariosService,
              private categoriaService:CategoriaService
    ) { }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe((resp) => {
      this.categorias = resp;
    });
  }

  async postular(id: string){

    await this.presentLoading()
    let storage = await Preferences.get({key: 'session'});
    let objetoStorage =  JSON.parse(storage.value!);

    let existePostulante = this.tareasService.verificarPostulante(id, objetoStorage.idUsuario)
    
    if (existePostulante) {
      this.loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Usted ya esta postulando',
        message: 'Usted se encuentra en la lista de postulantes a la tarea',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      this.tareasService.agregarPostulante(id, objetoStorage.idUsuario);
      this.loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Postulación Enviada',
        message: 'Postulaste a la tarea correctamente',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async verPostulantes(id: string){

    let usuarios:Usuario[]=[];

    const postulantes = this.tareasService.devolverPostulantes(id);

    postulantes?.forEach(postulante => {

      const user = this.userService.buscarXUsuario(postulante);
      
      if (user) {
        usuarios.push(user)
      }

    })

    const modal = await this.modalCtrl.create({
      component: DetalleTareaComponent,
      componentProps: {
        usuarios: usuarios,
        idTarea: id
      }
    });
    await modal.present();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Postulando...',
      duration: 20000
    });
    await this.loading.present();
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

  async editar(tareaAux:Tarea){

    if (tareaAux.id) {
      
      const modal = await this.modalCtrl.create({
        component: InfoRegistrarTareaComponent,
        componentProps: {
          tarea: tareaAux,
          listaCategoria: this.categorias
        }
      });
      await modal.present();   
    }
    
  }

}
