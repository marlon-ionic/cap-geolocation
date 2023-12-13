import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Gps } from '../geo';
import { Position } from '@capacitor/geolocation';
import { KeyValuePipe, NgForOf, NgIf } from '@angular/common';
import { Observable, Subscription, catchError, from, lastValueFrom, switchMap, throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, NgForOf, NgIf, KeyValuePipe],
})
export class HomePage implements OnInit {
  position?: Position['coords'];
  subscription?: Subscription;
  constructor() {}


  async ngOnInit() {
    console.log('ngOnInit');
    // const pos = await Gps.getCurrentPositionWithPermission();
    // this.position = pos.coords;
    // console.log('ngOnInit - called Gps.getCurrentPositionWithPermission()', pos);
  }

  async ionViewDidLeave(){
    console.log('ionViewDidLeave');
    this.subscription?.unsubscribe();
  }

  async ionViewWillEnter(): Promise<void> {
    console.log('ionViewWillEnter');
    const onStartGps = (): Observable<Position> => {
    return from(Gps.getCurrentPositionWithPermission());
    };
    this.subscription = onStartGps().subscribe({
      next: pos => {
        console.log('pos', pos);
        this.position = pos.coords;
      },
      error: (e) => console.error('gps error', e)
    });
    }
}
