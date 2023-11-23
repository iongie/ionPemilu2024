import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageResponseService {
  constructor(
    private toastController: ToastController
  ) { }

  async toastMode(isMessage: string, isDuration: number, isPosition: any, isPositionAnchor: string, isColor: any) {
    const toast = await this.toastController.create({
      message: isMessage,
      duration: isDuration,
      position: isPosition,
      positionAnchor: isPositionAnchor,
      color: isColor
    });

    await toast.present();
  }

}

