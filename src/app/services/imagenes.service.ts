import { Injectable } from '@angular/core';
import { Storage,ref,uploadBytes ,getDownloadURL,getStorage} from '@angular/fire/storage';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(private storage:Storage) { }
  async guardarImagen(file: any) {
    const imgRef = ref(this.storage, `images/${file.name}`);
    await uploadBytes(imgRef, file)
      .then()
      .catch((err) => console.log(err));
    const storage = getStorage();
    return await (getDownloadURL(ref(storage, `images/${file.name}`))
      .then((url) => {
        return url ;
      }) 
      .catch((error) => {
        console.log(error);
        return '';
      })) ;
  }
}
