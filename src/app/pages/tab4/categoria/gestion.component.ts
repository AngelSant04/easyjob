import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from '../../../interfaces/Categoria';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html'
})
export class GestionComponent implements OnInit {

  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.categoriaService.getCategorias('/api/Categoria/listarCategoria').subscribe(({ objeto }) => this.categorias = objeto);
  }

  async agregarCategoria() {
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
            this.categoriaService.agregarCategoria('/api/Categoria/agregarCategoria', data)
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


}
