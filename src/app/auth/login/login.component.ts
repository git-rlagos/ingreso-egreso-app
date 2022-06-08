import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService:AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  loginUsuario(){
    if(this.loginForm.invalid){ return; }

    Swal.fire({
      title: '¡Espere por favor!',
      didOpen: () => {
        Swal.showLoading()
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })

    const {email, password} = this.loginForm.value;
    this.authService.login(email, password)
    .then( credenciales => {
        console.log('Usuario Registrado, credenciales:');
        console.log(credenciales);
        Swal.close();
        this.router.navigate(['/']);
    })
    .catch( err => Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message,
      // footer: '<a href="">Why do I have this issue?</a>'
    }));
  }

}
