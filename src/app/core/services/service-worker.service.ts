import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServiceWorkerService {

  deferredPrompt: any;
  pwaButton = false;

  constructor(
    private swUpdate: SwUpdate,
    private actionSheetController: ActionSheetController
    ) {
    swUpdate.available.subscribe(event => {
      this.askUserToUpdate();
    });
  }

  addPwaToHomeScreen() {
    // Hide the user interface that shows our A2HS button
    this.pwaButton = false;

    // Show the prompt
    this.deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'acceptced') {
          console.log('User accepted the A2HS prompt', choiceResult);
        } else {
          console.log('User dismissed the A2HS prompt', choiceResult);
        }
        this.deferredPrompt = null;
      });
  }

  askUserToUpdate() {
    this.actionSheetController.create({
      header: 'A new version of the app is available.',
      subHeader: 'Load new version?',
      animated: true,
      cssClass: 'customActionSheet',
      buttons: [
        {
          text: 'Download',
          icon: 'code-download',
          handler: () => {
            this.updateApp();
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    })
    .then(actionSheet => {
      actionSheet.present();
    });
  }

  updateApp() {
    window.location.reload();
  }

}
