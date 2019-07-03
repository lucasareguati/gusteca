import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlatilloComponent } from './components/platillo/platillo.component';
import { HttpClientModule} from '@angular/common/http';
import { CargarPlatilloComponent } from './components/admin/cargar-platillo/cargar-platillo.component';
import { PrincipalPlatilloComponent } from './components/platillo/principal-platillo/principal-platillo.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { DetallePlatilloComponent } from './components/platillo/detalle-platillo/detalle-platillo.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth} from '@angular/fire/auth';
import { AdminComponent } from './components/admin/admin.component';
import { EditarPlatilloComponent } from './components/admin/editar-platillo/editar-platillo.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FooterComponent } from './components/footer/footer.component';
import { UsersComponent } from './components/admin/users/users.component';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    PlatilloComponent,
    CargarPlatilloComponent,
    PrincipalPlatilloComponent,
    NavbarComponent,
    HomeComponent,
    Page404Component,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    DetallePlatilloComponent,
    AdminComponent,
    EditarPlatilloComponent,
    FooterComponent,
    UsersComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [AngularFireAuth,
  NavbarComponent],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
