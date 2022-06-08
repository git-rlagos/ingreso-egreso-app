// Firestore
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth} from '@angular/fire/auth';
import { provideFirestore, getFirestore} from '@angular/fire/firestore';
// Modulos
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
import { FooterComponent } from './shared/footer/footer.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NgModule } from '@angular/core';
//NgRx
import {ReactiveFormsModule} from '@angular/forms'
import { RegisterComponent } from './auth/register/register.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
