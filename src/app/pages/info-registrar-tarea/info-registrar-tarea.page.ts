import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Tarea } from '../../interfaces/Tarea';
import { Categoria } from '../../interfaces/Categoria';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-info-registrar-tarea',
  templateUrl: './info-registrar-tarea.page.html',
  styleUrls: ['./info-registrar-tarea.page.scss'],
})
export class InfoRegistrarTareaPage implements OnInit {

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
  loading:any;

  listaCategoria: Categoria[] = [];
  tipo:string = '';

  mensajeNombre: string = '';
  mensajeDescripcion: string = '';
  mensajeDireccion: string = '';

  constructor(private modalCtrl: ModalController,
      private categoriaService: CategoriaService,
      private loadingCtrl: LoadingController,
    ) { }

  async ngOnInit() {

    await this.presentLoading()

    if (this.tarea.id) {
      this.tipo = "modificar";
    } else {
      this.tipo = "nuevo";
    }

    this.categoriaService.getCategorias().subscribe((resp) => {
      this.listaCategoria = resp;
      this.loading.dismiss();
    });    

    console.log(this.listaCategoria);
    
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
    return this.modalCtrl.dismiss({
      tarea: this.tarea,
    });
  }

  async modificar() {
    let storage = await Preferences.get({key: 'session'});
    let objetoStorage =  JSON.parse(storage.value!);
    this.tarea.idUserEmpleador = objetoStorage.idUsuario;
    return this.modalCtrl.dismiss({
      tarea: this.tarea,
    });
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Espere...',
      duration: 20000
    });
    await this.loading.present();
  }

}
