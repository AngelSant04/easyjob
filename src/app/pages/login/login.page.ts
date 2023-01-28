import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { usuarios } from 'src/environments/globales';

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
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.mostrar === 'password' ? this.bandera = true : this.bandera = false;
  }

  async ingresar(){

    if (!this.showErros()) return

    let user = usuarios.find( user => user.usuario === this.usuario && user.clave === this.password);

    if (user) {
      this.router.navigate(['tabs'])
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Error !!',
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
