import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter } from 'rxjs';

import { AppState } from '../../app.reducers';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { ThemeService } from 'ng2-charts';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  usuario?: Usuario | null;
  usuarioSubs: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) {
      this.usuarioSubs = this.store.select('user')
                                    .pipe( filter( ({user}) => user != null))
                                    .subscribe( ({user}) => this.usuario = user);

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.usuarioSubs.unsubscribe();
  }

  logout(){

    Swal.fire({
      title: '¡Cerrando sesión!',
      didOpen: () => {
        Swal.showLoading()
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })

    this.authService.logout().then( () => {
      setInterval(() => {
        Swal.close();
        this.router.navigate(['/login']);}, 400);

    });
  }

}
