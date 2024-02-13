import { Component, HostListener, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { delay, map } from 'rxjs';
import { PwaService } from './services/pwa/pwa.service';
import { AlertController } from '@ionic/angular';
import { Network, ConnectionStatus, ConnectionType } from '@capacitor/network';
import { NavigationEnd, Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  isInstallPWA = false;
  connected: boolean | null = null;
  connectionType: ConnectionType | null = null;

   constructor(
    private swUpdate: SwUpdate,
    private pwaService: PwaService,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.updatePwa();
    this.pwaService.getInstallPWA.subscribe(res => {
      this.isInstallPWA = res
    })
    Network.addListener('networkStatusChange', status => {
      this.connected = status.connected;
      this.connectionType = status.connectionType;
    });
    this.checknetworkStatus();
  }

  @HostListener('window:beforeinstallprompt', ['$event']) beforeInstallPWA(e:any) {
    e.preventDefault();
    this.pwaService.updateInstallPrompt(e);
    this.pwaService.updateInstallPWA(true);
  }

  async checknetworkStatus(){
     const networkStatus = await Network.getStatus()
     this.connected = networkStatus.connected;
     this.connectionType = networkStatus.connectionType;
  }

  updatePwa() {
    this.swUpdate.versionUpdates
      .pipe(
        delay(1000),
        map((ver) => {
          return ver.type !== 'NO_NEW_VERSION_DETECTED' ? true : false
        })
      )
      .subscribe((res) => {
        res && this.pwaAlert();
      })
  }

  async pwaAlert() {
    const alert = await this.alertController.create({
      header: 'Update New Version App?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Batal',
          cssClass: 'alert-button-cancel',
          role: 'cancel',
        },
        {
          text: 'Oke',
          cssClass: 'alert-button-confirm',
          handler: async () => {
            window.location.reload();
          }
        }
      ],
    });

    await alert.present();
  }

  async installPWA() {
    this.pwaService.getInstallPrompt
      .subscribe({
        next: (installPrompt) => (
          installPrompt.prompt(),
          installPrompt.userChoice,
          this.pwaService.updateInstallPWA(false)
        ),
        complete: () => this.pwaService.updateInstallPrompt(null)
      })
  }

  onActionPwa(actionPwa: any){
    actionPwa === 'install' && this.installPWA();
  }

}
