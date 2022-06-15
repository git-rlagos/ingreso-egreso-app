import { CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router){

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
