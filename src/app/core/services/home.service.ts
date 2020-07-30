import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  IP = '192.168.8.54';

  constructor(
    private httpClient: HttpClient,
    private toastController: ToastController
  ) {
    const localIP = localStorage.getItem(('setIP'));
    if (localIP) {
      this.IP = localIP;
    } else {
      localStorage.setItem('setIP', this.IP);
    }
  }

  unitButtonClick(unitLetter: string) {
    this.httpClient.get<any>(`http://${this.IP}/${unitLetter}`, {
      responseType: 'json'
    })
      .subscribe(res => {
        this.toastController.create({
          mode: 'ios',
          color: 'light',
          message: res.machineRes,
          duration: 5000,
          position: 'top',
          animated: true
        })
        .then(toast => {
          toast.present();
        });
      });
  }
}
