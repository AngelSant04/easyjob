import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import SwiperCore,{ Pagination, SwiperOptions} from 'swiper';
import { ModalController} from '@ionic/angular';
import { Browser } from '@capacitor/browser';
SwiperCore.use([Pagination])
@Component({
  selector: 'app-antecedente',
  templateUrl: './antecedente.component.html',
  styleUrls: ['./antecedente.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AntecedenteComponent {
  groupButtons1:boolean=true;
  pdfFile: any;
  configSwipe:SwiperOptions={
    slidesPerView:1,
    pagination:true,
   }
  constructor(private modalCtrl:ModalController) { }


  openFileDialog = () => {
    (document as any).getElementById('subida-archivo').click();
  };
  cargarPdf(_event: any) 
  {
    if (_event.target.files && _event.target.files[0]) {
      this.groupButtons1=false;
      this.pdfFile= _event.target.files[0];
    }
  }
  finalizar(){
    this.modalCtrl.dismiss({
        pdfFile:this.pdfFile
    });
  }
  async openBrowser(){
    await Browser.open({ url: 'https://www.empleosperu.gob.pe/CertificadoUnicoLaboral/' });
  };
}
