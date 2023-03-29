import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from '../../interfaces/Categoria';
import { CategoriaService } from '../../services/categoria.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-categorias',
  templateUrl: './listado-categorias.component.html',
})
export class ListadoCategoriasComponent implements OnInit {

  @Input() categorias: Categoria[] = []

  respuesta: any;
  loading: any;


  constructor(private categoriaService: CategoriaService,
    private alertController: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() { }

  async editar(categoria: Categoria) {

    await this.presentAlertEditar(categoria.id!);

  }

  async eliminar(id: string = '') {
    await this.presentLoading();
    this.categoriaService.eliminarCategoria(`/api/Categoria/eliminarCategoria?idCatg=${id}`)
      .subscribe(resp => {
        this.loading.dismiss();
        this.mensajeExitoso(resp);
      });
  }

  async presentAlertEditar(id: string) {

    const alert = await this.alertController.create({
      header: 'Ingresar Descripción de Categoria',
      inputs: [
        {
          name: 'Descripcion',
          type: 'text',
          placeholder: 'Ingrese Descripción',
        },
      ],
      buttons: [
        {
          text: 'Ok',
          handler: (data: any) => {
            this.categoriaService.editarCategoria(`/api/Categoria/modificarCategoria?id=${id}`, data)
              .subscribe(resp => {
                this.mensajeExitoso(resp);
              });
          }
        }
      ]
    });

    await alert.present();
  }

  async mensajeExitoso(resp: any) {
    const alert = await this.alertController.create({
      header: resp.mensaje,
      message: resp.objeto.descripcion,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigateByUrl('/tabs/tab4')
          }
        }
      ]
    });

    await alert.present();
  }

  async mensajeExitosoEliminar(resp: any) {
    const alert = await this.alertController.create({
      header: resp.mensaje,
      message: resp.objeto[0].descripcion,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigateByUrl('/tabs/tab4')
          }
        }
      ]
    });

    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 20000
    });
    await this.loading.present();
  }

}
