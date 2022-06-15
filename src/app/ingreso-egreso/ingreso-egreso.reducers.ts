import * as ioActions from './ingreso-egreso.actions';

import { createReducer, on } from '@ngrx/store';

import { AppState } from '../app.reducers';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export interface State {
    items: IngresoEgreso[];
}

export interface AppStateWithIngreso extends AppState {
  ingresosEgresos: State
}

export const initialState: State = {
   items: [],
}

export const ingresoEgresoReducer = createReducer(
  initialState,
  on(ioActions.setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(ioActions.unSetItems, (state) => ({ ...state, items: [] })),

);
