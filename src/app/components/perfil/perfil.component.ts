import { Component, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/Usuario';
import { Browser } from '@capacitor/browser';
import { ImagenesService } from '../../services/imagenes.service';
import { UsuariosService } from '../../services/usuarios.service';
import { StorageService } from 'src/app/services/storage.service';
import { Session } from '../../interfaces/Session';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
  mensajeNombre: string = '';
  mensajeApellido: string = '';
  mensajeTelefono: string = '';
  mensajeCorreo: string = '';
  mensajeUsuario: string = '';
  mensajeClave: string = '';
  previewProfle: any;
  loading: any;
  mostrar: string = 'password';
  bandera!: boolean;
  btnCardCuenta: boolean = true;
  @Input() usuario!: Usuario;
  @Input() sesion!:Session;
  constructor(
    private modalCtrl: ModalController,
    private imgSrv: ImagenesService,
    private userSrv: UsuariosService,
    private loadingcrtl: LoadingController,
    private storageSrv:StorageService
  ) {}
  volver() {
    return this.modalCtrl.dismiss();
  }
  openFileDialog(tipo: string) {
    if (tipo === 'img') {
      (document as any).getElementById('imagen-perfil').click();
    } else {
      (document as any).getElementById('subida-archivo').click();
    }
  }
  async cargarArchivo(_event: any, tipo: string) {
    if (_event.target.files && _event.target.files[0]) {
      await this.presentLoading();
      const file = _event.target.files[0];
      if (tipo === 'img') {
        this.usuario.imgUsuario = await this.imgSrv.guardarImagen(file);
      } else {
        this.usuario.cuentaValidada = true;
        this.usuario.pdfCuenta = await this.imgSrv.guardarImagen(file);
      }
      this.userSrv
        .actualizarUsuario(this.usuario)
        .then(() => {
          this.loading.dismiss();
        })
        .catch((err) => {
          this.loading.dismiss();
          throw err;
        });
    }
  }


  async eliminarCertificado() {
    await this.presentLoading();
    this.usuario.cuentaValidada = false;
    this.usuario.pdfCuenta = '';
    this.userSrv
      .actualizarUsuario(this.usuario)
      .then(() => {
        this.loading.dismiss();
      })
      .catch((err) => {
        this.loading.dismiss();
        throw err;
      });
  }
  async actCuenta() {
    if (!this.showErros()) return;
    this.btnCardCuenta = true;
    await this.presentLoading();
    await this.storageSrv.guardarSesion(this.usuario.usuario,this.usuario.usuario,(this.sesion.tipoSesion as string))
    this.userSrv
      .actualizarUsuario(this.usuario)
      .then(() => {
        this.loading.dismiss();
      })
      .catch((err) => {
        this.loading.dismiss();
        throw err;
      });
  }
  verClave() {
    if (this.bandera) {
      this.mostrar = 'text';
      this.bandera = false;
    } else {
      this.mostrar = 'password';
      this.bandera = true;
    }
  }
  showErros() {
    this.usuario.nombres
      ? (this.mensajeNombre = '')
      : (this.mensajeNombre = 'Nombres Requeridos');
    this.usuario.apellidos
      ? (this.mensajeApellido = '')
      : (this.mensajeApellido = 'Apellidos Requeridos');
    this.usuario.celular
      ? (this.mensajeTelefono = '')
      : (this.mensajeTelefono = 'Teléfono es Requerido');
    this.usuario.correo
      ? (this.mensajeCorreo = '')
      : (this.mensajeCorreo = 'Correo es Requerido');
    this.usuario.usuario
      ? (this.mensajeUsuario = '')
      : (this.mensajeUsuario = 'Usuario es Requerido');
    this.usuario.clave
      ? (this.mensajeClave = '')
      : (this.mensajeClave = 'Clave es Requerida');

    if (
      !this.mensajeUsuario &&
      !this.mensajeClave &&
      !this.mensajeNombre &&
      !this.mensajeApellido &&
      !this.mensajeTelefono &&
      !this.mensajeCorreo
    ) {
      return true;
    } else {
      return false;
    }
  }
  async presentLoading() {
    this.loading = await this.loadingcrtl.create({
      message: 'Procesando...',
      duration: 20000,
    });
    await this.loading.present();
  }
  async openBrowser() {
    await Browser.open({ url: `${this.usuario.pdfCuenta}` });
  }

}
