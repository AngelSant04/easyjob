import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import SwiperCore,{ Pagination, SwiperOptions,EffectCube } from 'swiper';
SwiperCore.use([Pagination,EffectCube])
@Component({
  selector: 'app-antecedente',
  templateUrl: './antecedente.component.html',
  styleUrls: ['./antecedente.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AntecedenteComponent implements OnInit {
  configSwipe:SwiperOptions={
    slidesPerView:1,
    pagination:true,
    effect:'cube'
   }
  constructor() { }

  ngOnInit() {}

}
