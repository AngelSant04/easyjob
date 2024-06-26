import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  NavController,
  AlertController,
} from '@ionic/angular';
import { RevisarPostulantesComponent } from '../../components/revisar-postulantes/revisar-postulantes.component';
import { StorageService } from '../../services/storage.service';
import { PerfilComponent } from '../../components/perfil/perfil.component';
import { UsuariosService } from '../../services/usuarios.service';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  loading:any;
  tipoSesion:string = ''
  constructor(
    private modalCtrl: ModalController,
    private nav: NavController,
    private storageSrv: StorageService,
    private alertCtrl: AlertController,
    private usuarioServ:UsuariosService,
    private router: Router
  ) {}

  async ngOnInit() {
    let storage = await Preferences.get({key: 'session'});
    let objetoStorage =  JSON.parse(storage.value!);
    
    this.tipoSesion = objetoStorage.tipoSesion;
  }


  async verPerfil() {
    let sesion:any;
    await this.storageSrv.getSesion().then(rep=>{
      sesion=rep;
      
    });
    const user= this.usuarioServ.buscarXUsuario(sesion.userName);
    const modal = await this.modalCtrl.create({   
      component: PerfilComponent,
      componentProps:{
        usuario:user,
      }
    });
    await modal.present();
  }

  async revisarPostulantes() {
    const modal = await this.modalCtrl.create({
      component: RevisarPostulantesComponent,
    });
    await modal.present();
  }
  async cerrarSesion() {
    const alert = await this.alertCtrl.create({
      header: '¿Quieres cerrar la sesión?',
      message:
        'Tendrás que verificar tu identidad la próxima vez que inicies sesión',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Continuar',
          role: 'confirm',
          handler: () => {
            this.storageSrv.limpiarSesion();
            this.nav.navigateRoot('');
          },
        },
      ],
    });
    await alert.present();
  }

  gestionCategorias(){
    this.router.navigateByUrl('tabs/tab4/categoria')
  }

}
