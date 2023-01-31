import { Injectable } from '@angular/core';
import { Tarea } from '../interfaces/Tarea';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { collection, doc, addDoc, deleteDoc } from 'firebase/firestore';
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

  borrarTarea(id: any) {
    const ref = doc(this.firestore, `tarea/${id}`);
    return deleteDoc(ref);
  }

}
