import { Component, OnInit } from '@angular/core';
import { usuarios } from 'src/environments/globales';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/Usuario';
import { ImagenesService } from '../../services/imagenes.service';
@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {
  mostrar: string = 'password';
  bandera!: boolean;
  usuario:Usuario={
    nombres:'',
    apellidos:'',
    celular:'',
    fechaNacimiento:'',
    usuario:'',
    correo:'',
    clave:'',

  };
  previewProfle:any;
  imageSrc!: any;
  mensajeNombre: string = '';
  mensajeApellido: string = '';
  mensajeTelefono: string = '';
  mensajeCorreo: string = '';
  mensajeUsuario: string = '';
  mensajeClave: string = '';

  constructor(private router: Router, private alertCtrl: AlertController,private imagensrv:ImagenesService) {}

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

    let user = usuarios.find(
      (user:Usuario) => user.usuario === this.usuario.usuario
    );

    if (user) {
      const alert = await this.alertCtrl.create({
        header: 'Error !!',
        message: 'Nombre de Usuario ya existe. Pruebe con otro',
        buttons: ['OK'],
      });

      this.usuario.usuario = '';

      await alert.present();
    } else {
      usuarios.push(this.usuario);

      // this.router.navigate(['tabs'])
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
  cargarImagen(_event: any){
    if (_event.target.files && _event.target.files[0]) {
      const file = _event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewProfle= reader.result;
      }
      reader.readAsDataURL(file);
  }

  }
  guardarImagen = async (_event: any) => {
    // if(_event.target.files![0])this.imagensrv.guardarImagen(_event);
  };

}
