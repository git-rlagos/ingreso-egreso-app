import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppState } from '../../app.reducers';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  usuario?: Usuario | null;
  usuarioSubs?: Subscription;

  constructor(private store: Store<AppState>) {
     this.usuarioSubs = this.store.select('user').subscribe( ({ user }) => this.usuario = user);
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.usuarioSubs?.unsubscribe();
  }

}
