import { Injectable } from '@angular/core';
import { Tarea } from '../interfaces/Tarea';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { collection, doc, addDoc, deleteDoc, updateDoc, getDoc, getDocFromCache } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { DataSnapshot } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private listaTareas!: Tarea[];

  constructor(private firestore: Firestore,
    ) {
      this.getTareas().subscribe((resp) => {
        this.listaTareas = resp;
      });
    }

  getTareas(): Observable<Tarea[]> {
    const ref = collection(this.firestore, 'tarea');
    return collectionData(ref, { idField: 'id' }) as Observable<Tarea[]>;
  }

  async getTarea(id: any): Promise<any> {
    const ref = doc(this.firestore, `tarea/${id}`);
    // return docData(ref, { idField: 'id' }) as Observable<Tarea>;
    const data = await getDoc(ref);
    return data.data();
  }

  async agregarTarea(tarea: Tarea) {
    const ref = collection(this.firestore, 'tarea');
    return addDoc(ref, tarea);
  }

  async modificarTarea(tarea: Tarea, id: any) {
    const ref = doc(this.firestore, `tarea/${id}`);
    return updateDoc(ref, {
      nombre: tarea.nombre,
      descripcion: tarea.descripcion,
      idCategoria: tarea.idCategoria,
      pago: tarea.pago,
      fechaRealizar: tarea.fechaRealizar,
      direccion: tarea.direccion
    })
  }

  verificarPostulante(id: any, idUsuario:string){
    
    let tarea = this.listaTareas.find(tarea => tarea.id === id)

    let postulante = tarea?.postulantes.find(postulante => postulante === idUsuario)

    if (postulante) {
      return true
    } else {
      return false
    }
    
    
  }

  existePostulantes(id: any){
    
    let tarea = this.listaTareas.find(tarea => tarea.id === id)
    

    if (tarea?.postulantes.length! > 0) {
      return true
    } else {
      return false
    }
    
    
  }

  agregarPostulante(id: any, idUsuario:string) {

    let data = this.getTarea(id);

    let postulantes:string[] = [];

    data.then(e=>{
      postulantes = e.postulantes;
      postulantes.push(idUsuario);
      const ref = doc(this.firestore, `tarea/${id}`);
      return updateDoc(ref, {
        postulantes: postulantes
      })
    })

  }

  borrarTarea(id: any) {
    const ref = doc(this.firestore, `tarea/${id}`);
    return deleteDoc(ref);
  }

}
