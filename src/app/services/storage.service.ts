import { Injectable } from '@angular/core';
import { Session } from '../interfaces/Session';
import { Preferences } from '@capacitor/preferences';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}
  async guardarSesion(id: string, usuario: string, tipo: string) {
    const session: Session = {
      idUsuario: id,
      userName: usuario,
      tipoSesion: tipo,
    };
    await Preferences.set({
      key: 'session',
      value: JSON.stringify(session),
    });
  }
  async getSesion(){
    let sesion:Session;
    try{
      const usuarioJSOn= await Preferences.get({
        key:'session'
      });
      sesion= JSON.parse(<string>usuarioJSOn.value) || null;
      return sesion;
    }catch(e){
      return null
    }
  }
  async limpiarSesion() {
    await Preferences.clear();
  }
}
