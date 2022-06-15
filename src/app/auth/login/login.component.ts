import * as ui from 'src/app/shared/ui.actions';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppState } from 'src/app/app.reducers';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  cargando: boolean = false;
  uiSubscription?: Subscription;


  constructor(private fb: FormBuilder,
              private authService:AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    // Creamos la suscripción a isLoading y le pasamos la referencia a variable local
    this.uiSubscription = this.store.select('ui')
                          .subscribe( ui => {
                            this.cargando = ui.isLoading;
                          })
  }

  ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe();
  }

  loginUsuario(){
    if(this.loginForm.invalid){ return; }

    this.store.dispatch( ui.isLoading());

    // Swal.fire({
    //   title: '¡Espere por favor!',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   },
    // }).then((result) => {
    //   /* Read more about handling dismissals below */
    //   if (result.dismiss === Swal.DismissReason.timer) {
    //     console.log('I was closed by the timer')
    //   }
    // })

    const {email, password} = this.loginForm.value;
    this.authService.login(email, password)
    .then( credenciales => {
        // Swal.close();
        this.store.dispatch( ui.stopLoading());
        this.router.navigate(['/']);
    })
    .catch( err => {
      this.store.dispatch( ui.stopLoading());

      Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message,
      // footer: '<a href="">Why do I have this issue?</a>'
    })});
  }

}
