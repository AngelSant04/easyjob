import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Tarea } from '../../interfaces/Tarea';
import { Categoria } from '../../interfaces/Categoria';

@Component({
  selector: 'app-info-registrar-tarea',
  templateUrl: './info-registrar-tarea.page.html',
  styleUrls: ['./info-registrar-tarea.page.scss'],
})
export class InfoRegistrarTareaPage implements OnInit {

  tarea: Tarea = {
    idCategoria : '',
    descripcion : '',
    direccion : '',
    fechaCreacion : '',
    fechaRealizar : '',
    nombre : '',
    pago : 0,
  };

  listaCategoria: Categoria[] = [];

  categoria !: Categoria;

  mensajeNombre: string = '';
  mensajeDescripcion: string = '';
  mensajeDirecció: string = '';

  constructor(private modalCtrl: ModalController,
      private categoriaService: CategoriaService
    ) { }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe((resp) => {
      this.listaCategoria = resp;
    });
  }

  cancel() {
    return this.modalCtrl.dismiss()
  }

  confirm() {
    return this.modalCtrl.dismiss({
      nombre: this.tarea
    });
  }

}
