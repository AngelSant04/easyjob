import { Component, OnInit, Input } from '@angular/core';
import { Tarea } from '../../interfaces/Tarea';
import { Categoria } from '../../interfaces/Categoria';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { CategoriaService } from '../../services/categoria.service';
import { Preferences } from '@capacitor/preferences';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-info-registrar-tarea',
  templateUrl: './info-registrar-tarea.component.html',
  styleUrls: ['./info-registrar-tarea.component.scss'],
})
export class InfoRegistrarTareaComponent implements OnInit {

  @Input() tarea: Tarea = {
    idCategoria : '',
    descripcion : '',
    direccion : '',
    fechaCreacion : '',
    fechaRealizar : '',
    nombre : '',
    pago: 0,
    estado: '',
    idUserEmpleado: '',
    idUserEmpleador: '',
    postulantes: [],
  };
  @Input() listaCategoria: Categoria[] = [];
  loading:any;
  tipo:string = '';

  mensajeNombre: string = '';
  mensajeDescripcion: string = '';
  mensajeDireccion: string = '';

  constructor(private modalCtrl: ModalController,
      private categoriaService: CategoriaService,
      private loadingCtrl: LoadingController,
      private tareasService:TareasService,
      private alertCtrl: AlertController,
    ) { }

  ngOnInit() {
    if (this.tarea.id) {
      this.tipo = "modificar";
    } else {
      this.tipo = "nuevo";
    }
  }

  cancel() {
    return this.modalCtrl.dismiss();
  }

  async confirm() {
    let fecha = new Date();
    this.tarea.fechaCreacion = fecha.toString();
    this.tarea.estado = 'publicado';    
    let storage = await Preferences.get({key: 'session'});
    let objetoStorage =  JSON.parse(storage.value!);
    this.tarea.idUserEmpleador = objetoStorage.idUsuario;

    if (this.tarea) {
      
      await this.presentLoading();    
      await this.tareasService.agregarTarea(this.tarea).then(resp => {
        this.loading.dismiss();
      }).catch(e => {
        this.loading.dismiss();
        throw e;
      })
      const alert = await this.alertCtrl.create({
        header: 'Tarea Registrada',
        message: 'Tarea registrada exitosamente',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.cancel()
          }
        }],
      });
      await alert.present();
    }
  }

  async modificar() {
    let storage = await Preferences.get({key: 'session'});
    let objetoStorage =  JSON.parse(storage.value!);
    this.tarea.idUserEmpleador = objetoStorage.idUsuario;
    if (this.tarea.id) {

      await this.presentLoading();
      await this.tareasService.modificarTarea(this.tarea, this.tarea.id).then(resp => {
        this.loading.dismiss();
      }).catch(e => {
        this.loading.dismiss();
        throw e;
      })
      const alert = await this.alertCtrl.create({
        header: 'Tarea Modificada',
        message: 'Tarea modificada exitosamente',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.cancel()
          }
        }],
      });
      await alert.present();
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
