import { Injectable } from '@angular/core';
import { Categoria } from '../interfaces/Categoria';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {


  constructor(private firestore: Firestore) {}

  getCategorias(): Observable<Categoria[]> {
    const ref = collection(this.firestore, 'categoria');
    return collectionData(ref, { idField: 'id' }) as Observable<Categoria[]>;
  }
  
}
