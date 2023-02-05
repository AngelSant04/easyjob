import { Component,ViewEncapsulation } from '@angular/core';
import SwiperCore,{ Pagination, SwiperOptions,EffectCube } from 'swiper';
SwiperCore.use([Pagination,EffectCube])
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  encapsulation:ViewEncapsulation.None
})
export class Tab1Page {

  configSwipe:SwiperOptions={
   slidesPerView:1,
   pagination:true,
   effect:'cube'
  }
  constructor() {}

}
