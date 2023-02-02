import { Injectable } from '@angular/core';
import { Tarea } from '../interfaces/Tarea';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { collection, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {


  constructor(private firestore: Firestore) {}

  getTareas(): Observable<Tarea[]> {
    const ref = collection(this.firestore, 'tarea');
    return collectionData(ref, { idField: 'id' }) as Observable<Tarea[]>;
  }

  getTarea(id: any): Observable<Tarea> {
    const ref = doc(this.firestore, `tarea/${id}`);
    return docData(ref, { idField: 'id' }) as Observable<Tarea>;
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

  borrarTarea(id: any) {
    const ref = doc(this.firestore, `tarea/${id}`);
    return deleteDoc(ref);
  }

}
