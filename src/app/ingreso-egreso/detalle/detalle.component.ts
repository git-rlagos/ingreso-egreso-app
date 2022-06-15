import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppState } from '../../app.reducers';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Unsubscribe } from '@angular/fire/firestore';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresosSubs?: Subscription;

  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresosSubs = this.store.select('ingresosEgresos')
                                  .subscribe( ({items}) => this.ingresosEgresos = items);
  }

  ngOnDestroy(): void {
      this.ingresosSubs?.unsubscribe();
      // this.ingresoEgresoService.unsubscribe();
  }

  borrar(uid: any){
      this.ingresoEgresoService.borrarItem(uid)
      .then( () => {
        Swal.fire('Borrado', 'Item borrado', 'success');
      })
      .catch( err => Swal.fire('Error', err.message, 'error'));

  }
}
