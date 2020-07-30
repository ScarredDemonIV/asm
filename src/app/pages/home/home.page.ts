import { Component, OnInit, HostListener } from '@angular/core';

import { ServiceWorkerService } from 'src/app/core/services/service-worker.service';
import { HomeService } from 'src/app/core/services/home.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public localSW: ServiceWorkerService,
    public homeService: HomeService,
  ) { }

  ngOnInit() {
  }

  unitButtonClick(unitLetter: string) {
    this.homeService.unitButtonClick(unitLetter);
  }

}
