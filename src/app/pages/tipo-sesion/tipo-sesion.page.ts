import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo-sesion',
  templateUrl: './tipo-sesion.page.html',
  styleUrls: ['./tipo-sesion.page.scss'],
})
export class TipoSesionPage implements OnInit {
  imgProfile:string='https://firebasestorage.googleapis.com/v0/b/storageeasyjob.appspot.com/o/images%2FPIERO%20SALAZAR%20PERFIL.jpg?alt=media&token=659d1532-860d-4624-a925-d961c4acc7da';
  selected:boolean=true;
  constructor() { }

  ngOnInit() {
  }
  select(){
    this.selected=false;
  }
}
