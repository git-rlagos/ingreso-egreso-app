import * as auth from './auth/auth.reducers';
import * as io from './ingreso-egreso/ingreso-egreso.reducers';
import * as ui from './shared/ui.reducers';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
   ui: ui.State,
   user: auth.State,
   ingresosEgresos: io.State
}

export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   user: auth.authReducer,
   ingresosEgresos: io.ingresoEgresoReducer
}
