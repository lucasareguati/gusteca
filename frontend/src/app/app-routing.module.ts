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
import { UsersComponent } from './components/admin/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { ConsultasComponent } from './components/admin/consultas/consultas.component';
import { PlatilloComponent } from './components/platillo/platillo.component';
import { VentasComponent } from './components/admin/ventas/ventas.component';
import { RideComponent } from './components/clasificacionPlatos/ride/ride.component';
import { CrashComponent } from './components/clasificacionPlatos/crash/crash.component';
import { HithatComponent } from './components/clasificacionPlatos/hithat/hithat.component';
const routes: Routes = [
  { path: '', component: PrincipalPlatilloComponent },
  { path: 'platillo', component: PlatilloComponent},
  { path: 'ride', component: RideComponent},
  { path: 'crash', component: CrashComponent },
  { path: 'hithat', component: HithatComponent},
  { path: 'admin', component: AdminComponent },
  { path: 'admin/cargar-platillo', component: CargarPlatilloComponent, canActivate: [AdminGuard] },
  { path: 'admin/editar-platillo', component: EditarPlatilloComponent, canActivate: [AdminGuard] },
  { path: 'admin/users', component: UsersComponent, canActivate: [AdminGuard]},
  { path: 'admin/ventas', component: VentasComponent, canActivate: [AdminGuard]},
  { path: 'admin/consultas', component: ConsultasComponent },
  { path: 'platillo/:id', component: DetallePlatilloComponent},
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent},
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard]}, // solo auth
  { path: '**', component: Page404Component},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
