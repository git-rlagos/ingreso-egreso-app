import * as ioActions from '../ingreso-egreso/ingreso-egreso.actions';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter } from 'rxjs';

import { AppState } from '../app.reducers';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { Unsubscribe } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs?: Subscription;
  ingresoSubs?: Subscription;
  ingresoUnsubs?: Unsubscribe;

  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) {

  }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
    .pipe(
      filter(auth => auth.user !== null)  // El pipe filter permite condicionar al subcribe.
    )
    .subscribe( ({user}) => {
      // El método Listener, debe usar onSnapshot para crer un escucha del store.
       this.ingresoEgresoService.initIngresosEgresosListener(user?.uid!);
    });
  }

  ngOnDestroy(): void {
      this.userSubs?.unsubscribe();
      this.ingresoSubs?.unsubscribe();
  }

}
