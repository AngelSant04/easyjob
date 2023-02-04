import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  listaCategoria: Categoria[] = [];
  tipo:string = '';

  mensajeNombre: string = '';
  mensajeDescripcion: string = '';
  mensajeDireccion: string = '';

  constructor(private modalCtrl: ModalController,
      private categoriaService: CategoriaService,
    ) { }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe((resp) => {
      this.listaCategoria = resp;
    });    
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

}
