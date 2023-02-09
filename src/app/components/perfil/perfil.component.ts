import { Component, Input, OnInit } from '@angular/core';
import {
  ModalController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
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
export class PerfilComponent implements OnInit {
  userAux: Usuario = {
    nombres: '',
    apellidos: '',
    celular: '',
    fechaNacimiento: '',
    usuario: '',
    correo: '',
    clave: '',
    dni: '',
  };
  searchButton:boolean=true;
  dataSesion: any;
  mensajeDNI: string = '';
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
  btnCardPersonal: boolean = true;
  @Input() usuario!: Usuario;
  @Input() sesion!: Session;
  constructor(
    private modalCtrl: ModalController,
    private imgSrv: ImagenesService,
    private userSrv: UsuariosService,
    private loadingcrtl: LoadingController,
    private storageSrv: StorageService,
    private alertCtrl: AlertController
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
        this.userAux.imgUsuario = await this.imgSrv.guardarImagen(file);
      } else {
        this.userAux.cuentaValidada = true;
        this.userAux.pdfCuenta = await this.imgSrv.guardarImagen(file);
      }
      this.userSrv
        .actualizarUsuario(this.userAux)
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
    this.userAux.cuentaValidada = false;
    this.userAux.pdfCuenta = '';
    this.userSrv
      .actualizarUsuario(this.userAux)
      .then(() => {
        this.loading.dismiss();
      })
      .catch((err) => {
        this.loading.dismiss();
        throw err;
      });
  }
  async actCuenta() {
    if (
      this.usuario.usuario === this.userAux.usuario &&
      this.usuario.clave === this.userAux.clave
    ) {
      this.btnCardCuenta = true;
      const alert = await this.alertCtrl.create({
        header: 'Advertencia',
        message: `No hay cambios por realizar`,
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      if (!this.showErros()) return;
      let validUser: boolean;
      if (this.usuario.usuario === this.userAux.usuario) {
        validUser = true;
      } else {
        validUser = this.userSrv.validarUsuario(this.userAux);
      }
      if (validUser) {
        this.btnCardCuenta = true;
        await this.storageSrv.guardarSesion(
          this.userAux.usuario,
          this.userAux.usuario,
          this.dataSesion.tipoSesion as string
        );
        await this.actualizar();
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: `Nombre de Usuario ya existe. Pruebe con otro`,
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
  async actDatosPersonales() {
    if (
      this.userAux.nombres === this.usuario.nombres &&
      this.userAux.apellidos === this.usuario.apellidos &&
      this.userAux.celular === this.usuario.celular &&
      this.userAux.fechaNacimiento === this.usuario.fechaNacimiento &&
      this.userAux.correo === this.usuario.correo &&
      this.userAux.dni === this.usuario.dni
    ) {
      this.btnCardPersonal = true;
      this.searchButton=true;
      const alert = await this.alertCtrl.create({
        header: 'Advertencia',
        message: `No hay cambios por realizar`,
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      if (!this.showErros()) return;
      let validUser: boolean;
      if (this.usuario.correo === this.userAux.correo) {
        validUser = true;
      } else {
        validUser = this.userSrv.validarCorreo(this.userAux);
      }
      if (validUser) {
        this.btnCardPersonal = true;
        this.searchButton=true;
        this.userSrv.buscarDNI(this.userAux.dni).subscribe(async (rep) => {
          if (rep.success) {
            await this.actualizar();
          }else{
            this.searchButton=false;
            const alert = await this.alertCtrl.create({
              header: 'Error',
              message: `DNI Incorrecto`,
              buttons: ['OK'],
            });
            await alert.present();
          }
        });
        
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: `Correo ya existe. Pruebe con otro`,
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
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
    this.userAux.dni
      ? (this.mensajeDNI = '')
      : (this.mensajeDNI = 'DNI Requerido');
    this.userAux.nombres
      ? (this.mensajeNombre = '')
      : (this.mensajeNombre = 'Nombres Requeridos');
    this.userAux.apellidos
      ? (this.mensajeApellido = '')
      : (this.mensajeApellido = 'Apellidos Requeridos');
    this.userAux.celular
      ? (this.mensajeTelefono = '')
      : (this.mensajeTelefono = 'Teléfono es Requerido');
    this.userAux.correo
      ? (this.mensajeCorreo = '')
      : (this.mensajeCorreo = 'Correo es Requerido');
    this.userAux.usuario
      ? (this.mensajeUsuario = '')
      : (this.mensajeUsuario = 'Usuario es Requerido');
    this.userAux.clave
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
    await Browser.open({ url: `${this.userAux.pdfCuenta}` });
  }
  async actualizar(){
    await this.presentLoading()
        this.userSrv
          .actualizarUsuario(this.userAux)
          .then(() => {
            this.loading.dismiss();
          })
          .catch((err) => {
            this.loading.dismiss();
            throw err;
          });

        const alert = await this.alertCtrl.create({
          header: 'Actualizado Correctamente',
          message: 'Click en OK para continuar',
          buttons: ['Ok'],
        });
        await alert.present();
        await alert.onDidDismiss();
  }
  async buscarDNI() {
    await this.presentLoading()
    this.userSrv.buscarDNI(this.userAux.dni).subscribe(async (rep) => {
      if (rep.success) {
        this.loading.dismiss();
        this.userAux.nombres = rep.data.nombres;
        this.userAux.apellidos = `${rep.data.apellido_paterno} ${rep.data.apellido_materno}`;
      }else{
        this.loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: `DNI Incorrecto`,
          buttons: ['OK'],
        });
        await alert.present();
      }
    });
  }
  numberOnlyValidation(event: any) {
    //pattern
    const pattern = /[0-9]/;
    const inputChar = event.key; // add
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
   
  }
  iconSearchValidation(){
    const cadena = this.userAux.dni.length
    if(cadena>0)this.searchButton=false;
    else this.searchButton=true;
  }
  async ngOnInit() {
    this.userAux.id = this.usuario.id;
    this.userAux.nombres = this.usuario.nombres;
    this.userAux.apellidos = this.usuario.apellidos;
    this.userAux.celular = this.usuario.celular;
    this.userAux.fechaNacimiento = this.usuario.fechaNacimiento;
    this.userAux.usuario = this.usuario.usuario;
    this.userAux.correo = this.usuario.correo;
    this.userAux.clave = this.usuario.clave;
    this.userAux.imgUsuario = this.usuario.imgUsuario;
    this.userAux.pdfCuenta = this.usuario.pdfCuenta;
    this.userAux.cuentaValidada = this.usuario.cuentaValidada;
    this.userAux.dni = this.usuario.dni;
    this.dataSesion = await this.storageSrv.getSesion();
  }
}
