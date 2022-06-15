import * as uiActions from '../shared/ui.actions';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppState } from '../app.reducers';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;
  uiSuscripcion: Subscription;

  constructor(
        private fb: FormBuilder,
        private ingresoEgresoServicio: IngresoEgresoService,
        private store: Store<AppState>
  ) {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required ],
      monto: ['', Validators.required ]
    });

    this.uiSuscripcion = this.store.select('ui').subscribe( (state) => this.cargando = state.isLoading);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.uiSuscripcion.unsubscribe();
  }

  guardar(){

    if(this.ingresoForm.invalid) return;

    this.store.dispatch(uiActions.isLoading());

    const {descripcion, monto} = this.ingresoForm.value;
    this.ingresoForm.get('tipo')?.setValue(this.tipo);

    const ingresoEgreso = { descripcion, monto, tipo: this.tipo};

    this.ingresoEgresoServicio.crearIngresoEgreso(ingresoEgreso)
        .then( () => {
            Swal.fire('Registro creado', descripcion, 'success');
            this.tipo = 'ingreso';
            this.ingresoForm.reset();
            this.store.dispatch(uiActions.stopLoading());

        })
        .catch( err => {
          Swal.fire('Error ', err.message, 'error');
          this.store.dispatch(uiActions.stopLoading());

        });

  }

}
