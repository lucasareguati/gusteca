import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetallePlatilloComponent } from './components/platillo/detalle-platillo/detalle-platillo.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { CargarPlatilloComponent } from './components/admin/cargar-platillo/cargar-platillo.component';
import { AdminComponent } from './components/admin/admin.component';
import { PrincipalPlatilloComponent } from './components/platillo/principal-platillo/principal-platillo.component';
import { EditarPlatilloComponent } from './components/admin/editar-platillo/editar-platillo.component';

const routes: Routes = [
  { path: '', component: PrincipalPlatilloComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/cargar-platillo', component: CargarPlatilloComponent },
  { path: 'admin/editar-platillo', component: EditarPlatilloComponent },
  { path: 'platillo/:id', component: DetallePlatilloComponent}, // platillo/:id
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent},
  { path: 'user/profile', component: ProfileComponent}, // solo auth
  { path: '**', component: Page404Component},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
