import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/Usuario';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {
  searchButton:boolean=true;
  mostrar: string = 'password';
  bandera!: boolean;
  usuario: Usuario = {
    nombres: '',
    apellidos: '',
    celular: '',
    fechaNacimiento: '',
    usuario: '',
    correo: '',
    clave: '',
    dni: '',
  };
  previewProfle: any;
  imgFile: any;
  loading: any;
  mensajeNombre: string = '';
  mensajeApellido: string = '';
  mensajeTelefono: string = '';
  mensajeCorreo: string = '';
  mensajeUsuario: string = '';
  mensajeClave: string = '';
  constructor(
    private userSrv: UsuariosService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingcrtl: LoadingController
  ) {}

  ngOnInit() {
    this.mostrar === 'password'
      ? (this.bandera = true)
      : (this.bandera = false);
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
  async registrar() {
    if (!this.showErros()) return;
    const validUser = this.userSrv.validarRegistro(this.usuario);
    if (!validUser.length) {
      await this.presentLoading();
      await this.userSrv
        .agregarUsuario(this.usuario, this.imgFile)
        .then((resp) => {
          this.loading.dismiss();
        })
        .catch((err) => {
          this.loading.dismiss();
          throw err;
        });
      const alert = await this.alertCtrl.create({
        header: 'Registro Exitoso',
        message: `Vuelve a iniciar sesión`,
        buttons: ['Continuar'],
      });
      await alert.present();
      await alert.onDidDismiss();
      this.router.navigate(['']);
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: `${validUser} ya existe. Pruebe con otro`,
        buttons: ['OK'],
      });
      await alert.present();
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
  openFileDialog = () => {
    (document as any).getElementById('file-upload').click();
  };
  cargarImagen(_event: any) {
    if (_event.target.files && _event.target.files[0]) {
      const file = _event.target.files[0];
      this.imgFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewProfle = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  async presentLoading() {
    this.loading = await this.loadingcrtl.create({
      message: 'Procesando...',
      duration: 20000,
    });
    await this.loading.present();
  }
  async buscarDNI() {
    await this.presentLoading()
    this.userSrv.buscarDNI(this.usuario.dni).subscribe(async (rep) => {
      if (rep.success) {
        this.loading.dismiss();
        this.usuario.nombres = rep.data.nombres;
        this.usuario.apellidos = `${rep.data.apellido_paterno} ${rep.data.apellido_materno}`;
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
    const cadena = this.usuario.dni.length
    if(cadena>0)this.searchButton=false;
    else this.searchButton=true;
  }
  async crearAlerta(header:string,message:string,buttons:String[]){
    return await this.alertCtrl.create({
      header: 'Registro Exitoso',
      message: `Vuelve a iniciar sesión`,
      buttons: ['Continuar'],
    });
  }
}
