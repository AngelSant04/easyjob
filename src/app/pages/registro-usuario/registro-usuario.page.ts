import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/Usuario';
import { ImagenesService } from '../../services/imagenes.service';
import { format, parseISO } from 'date-fns';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {
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
  };
  previewProfle: any;
  imgFile:any;
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
    private imagensrv: ImagenesService,
    
  ) { }

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
    const validUser= this.userSrv.validarUsuario(this.usuario);
    console.log(validUser);
    if(!validUser.length){
      const resp= await this.userSrv.agregarUsuario(this.usuario,this.imgFile);
      const alert = await this.alertCtrl.create({
        header: 'Bienvenido',
        message: `Tu usuario ha sido registrado` ,
        buttons: ['Continuar'],
      });
      await alert.present();
      await alert.onDidDismiss();
      this.usuario.usuario = '';
      this.router.navigate(['tabs'])
    }else{
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: `${validUser} ya existe. Pruebe con otro` ,
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
      this.imgFile=file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewProfle = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
