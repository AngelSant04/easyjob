import { Injectable } from '@angular/core';
import { Categoria } from '../interfaces/Categoria';
import { HttpClient } from '@angular/common/http';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collection } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

const URL    = environment.apiBaseUrl;
const puerto = environment.puerto;

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {


  constructor(private firestore: Firestore,
      private http: HttpClient
    ) {}

  // getCategorias('/api/Categoria/listarCategoria'): Observable<Categoria[]> {
  //   const ref = collection(this.firestore, 'categoria');
  //   return collectionData(ref, { idField: 'id' }) as Observable<Categoria[]>;
  // }

  private ejecutarQuery<T>( query: string ) {

    query = URL + puerto + query;
    

    return this.http.get<any>( query );

  }

  getCategorias(query: string) {
    
    return this.ejecutarQuery<any>(query);

  }
  
}
