import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loading: HTMLIonLoadingElement;

  constructor(private loadingCtrl: LoadingController) {}

  async show(msg?: any) {
  
    this.loading = await this.loadingCtrl.create({
      message: msg,
      cssClass: 'custom-loader'
    });
    
    await this.loading.present();
  
    
  }

  async hide() {

    if (this.loading) {
      console.log('No loading instance to dismisshello abi');
      await this.loading.dismiss();
      this.loading = null;
    } else {
      this.loading.dismiss();
      console.log('No loading instance to dismiss');
    }
  }
}
