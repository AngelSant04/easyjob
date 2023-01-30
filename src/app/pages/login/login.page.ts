import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuariosService } from '../../services/usuarios.service';
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

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private userSrv: UsuariosService
  ) { }

  ngOnInit() {
    this.mostrar === 'password' ? this.bandera = true : this.bandera = false;
  }

  async ingresar(){

    if (!this.showErros()) return
    const user= await this.userSrv.validarCuenta(this.usuario,this.password);
    if (user) {
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

}
