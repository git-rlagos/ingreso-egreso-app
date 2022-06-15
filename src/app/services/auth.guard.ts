import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router){

  }

  canLoad(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap( estado => {
          const user = this.authService.user;
          if (!estado || !user) { this.router.navigate(['/login']); }
      }),
      take(1) //Cade vez que quiero entrar a cargar el módulo, debo preparar una nueva subscripción.
    );

  }

  canActivate(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap( estado => {
          const user = this.authService.user;
          if (!estado || !user) { this.router.navigate(['/login']); }
      })
    );

  }

}
