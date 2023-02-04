import { Injectable } from '@angular/core';
import { Usuario, DNIResponse, DataDNI } from '../interfaces/Usuario';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { map, Observable } from 'rxjs';
import { ImagenesService } from './imagenes.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { REFUSED } from 'dns';
const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  public listaUsuarios!: Usuario[];
  public dniInfo:any;
  constructor(
    private firestore: Firestore,
    private imgSrv: ImagenesService,
    private http: HttpClient
  ) {
    this.getUsuarios().subscribe((resp) => {
      this.listaUsuarios = resp;
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
  validarRegistro(usuario: Usuario) {
    let mensaje = '';
    const validUser = this.listaUsuarios.find((user) => {
      return user.correo == usuario.correo || user.usuario === usuario.usuario;
    });
    if (validUser) {
      if (validUser.correo === usuario.correo) {
        mensaje = 'Correo';
      } else {
        mensaje = 'Nombre de Usuario';
      }
    }
    return mensaje;
  }
  async validarCuenta(usuario: string, password: string) {
    const user = this.listaUsuarios.find(
      (user) => user.usuario === usuario && user.clave === password
    );
    if (user) {
      return user;
    } else {
      return null;
    }
  }
  buscarDNI(dni: string){
    return this.http.get<DNIResponse>(`${apiUrl}${dni}${apiKey}`)
  }
}
