import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController,LoadingController } from '@ionic/angular';
import { UsuariosService } from '../../services/usuarios.service';
import { TipoSesionComponent } from '../../components/tipo-sesion/tipo-sesion.component';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  usuario: string = '';
  password: string = '';
  mostrar: string = 'password';
  bandera !: boolean ;
  mensajeUsuario: string = '';
  mensajeClave: string = '';
  loading: any;
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private userSrv: UsuariosService,
    private modalCtrl: ModalController,
    private storageSrv:StorageService,
    private loadingcrtl: LoadingController
  ) { }

  ngOnInit() {
    this.mostrar === 'password' ? this.bandera = true : this.bandera = false;
  }

  async ingresar(){
    if (!this.showErros()) return
    await this.presentLoading();
    const user= await this.userSrv.validarCuenta(this.usuario,this.password).then(rep=>{
      this.loading.dismiss();
      if(rep){
        return rep
      }else{
        return null
      }
    }).catch((err) => {
      this.loading.dismiss();
      throw err;
    });
    if (user) {
      const modal = await this.modalCtrl.create({
        component: TipoSesionComponent,
        componentProps:{
          usuario:user
        }
      })
      await modal.present();
      const {data}= await modal.onWillDismiss();
      this.storageSrv.guardarSesion(user.id!,this.usuario,data.sesion)
      this.router.navigate(['tabs'])
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Usuario o Contraseña invalidas',
        buttons: ['OK'],
      });
      await alert.present();
    }

  }
  verClave(){

    if (this.bandera) {
      this.mostrar = 'text';
      this.bandera = false;
    } else {
      this.mostrar = 'password';
      this.bandera = true;
    }
    
  }

  showErros(){
    this.usuario ? this.mensajeUsuario = '' : this.mensajeUsuario = 'Usuario es Requerido'
    this.password ? this.mensajeClave = '' : this.mensajeClave = 'Clave es Requerido'

    if (!this.mensajeUsuario && !this.mensajeClave) {
      return true
    } else {
      return false
    }
  }
  async presentLoading() {
    this.loading = await this.loadingcrtl.create({
      message: 'Procesando...',
      duration: 20000,
    });
    await this.loading.present();
  }

}
