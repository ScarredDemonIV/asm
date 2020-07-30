import { Component, HostListener } from '@angular/core';

import { Platform, AlertController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ServiceWorkerService } from './core/services/service-worker.service';
import { HomeService } from './core/services/home.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private homeService: HomeService,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private localSW: ServiceWorkerService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.initializeApp();
  }

  @HostListener('window:beforeinstallprompt', ['$event']) onbeforeinstallprompt(event) {
    // Prevent Chrome 67 and earlier from offering to install
    event.preventDefault();

    // Stash the event so it can be triggered later.
    this.localSW.deferredPrompt = event;
    this.localSW.pwaButton = true;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  promptIpChange() {
    this.alertCtrl.create({
      header: 'Change the app\'s local IP address',
      inputs: [
        {
          name: 'newIP',
          type: 'text',
          placeholder: 'Type Here'
        }
      ],
      buttons: [
        {
          text: 'OK',
          handler: (alertData) => {
            let message = '';
            if (alertData.newIP) {
              this.homeService.IP = alertData.newIP;
              message = `IP Updated to ${this.homeService.IP}`;
              localStorage.setItem('setIP', alertData.newIP);
            } else {
              message = 'IP Not Updated';
            }
            this.alertCtrl.dismiss();
            this.showIpToast(message);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    })
    .then(alert => {
      alert.present();
    });
  }

  showIpToast(message: string) {
    this.toastCtrl.create({
      mode: 'ios',
      color: 'light',
      message,
      animated: true,
      duration: 3000,
      position: 'top'
    })
    .then(toast => {
      toast.present();
    });
  }
}
