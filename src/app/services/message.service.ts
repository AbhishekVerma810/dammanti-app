import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  currentToast: any;

  constructor(
    private toastController: ToastController
  ) { }
  //  async presentToast(msg?: any, color?: any,position?: any) {
  //    const toast = await this.toastController.create({
  //     message: msg,
  //     duration: 3000,
  //     color: color,
  //     position: position,
  //   });
  //    await toast.present();
  //   }
  
async presentToast(msg?: any, color?: any, position?: any) {
  // Dismiss the current toast if it exists
  if (this.currentToast) {

    console.log('hello abhi how',this.currentToast)
    await this.currentToast.dismiss();
    this.currentToast = null;
  }

  // Create and present the new toast
  const toast = await this.toastController.create({
    message: msg,
    duration: 3000,
    color: color,
    position: position,
  });
  await toast.present();
  this.currentToast = toast;
}
 }
