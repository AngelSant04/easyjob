import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../interfaces/Usuario';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss'],
})
export class DetalleUsuarioComponent implements OnInit {

  @Input() usuarios!: Usuario[];

  constructor() { }

  ngOnInit() {}

}
