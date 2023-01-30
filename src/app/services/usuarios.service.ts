import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/Usuario';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { ImagenesService } from './imagenes.service';
@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  public listaUsuarios!: Usuario[];
  constructor(private firestore: Firestore, private imgSrv: ImagenesService) {
    this.getUsuarios().subscribe((resp) => {
      this.listaUsuarios = resp;
      console.log(this.listaUsuarios);
    });
  }

  getUsuarios(): Observable<Usuario[]> {
    const ref = collection(this.firestore, 'usuarios');
    return collectionData(ref, { idField: 'id' }) as Observable<Usuario[]>;
  }
  getUsuario(id: any): Observable<Usuario> {
    const ref = doc(this.firestore, `usuarios/${id}`);
    return docData(ref, { idField: 'id' }) as Observable<Usuario>;
  }
  async agregarUsuario(usuario: Usuario, imgFile: any) {
    const ref = collection(this.firestore, 'usuarios');
    usuario.imgUsuario = await this.imgSrv.guardarImagen(imgFile);
    return addDoc(ref, usuario);
  }
  borrarUsuario(id: any) {
    const ref = doc(this.firestore, `usuarios/${id}`);
    return deleteDoc(ref);
  }
  validarUsuario(usuario: Usuario) {
    let mensaje='';
    console.log(this.listaUsuarios);
    const validUser = this.listaUsuarios.find((user) => {
     return user.correo==usuario.correo || user.usuario===usuario.usuario
    });
    console.log(validUser);
    if(validUser){
      if(validUser.correo===usuario.correo){
        mensaje='Correo'
      }else{
        mensaje='Nombre de Usuario'
      }
    }
    console.log(mensaje);
    return mensaje;
  }
}
