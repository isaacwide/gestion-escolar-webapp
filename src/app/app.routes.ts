import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [

  {
    path: '',
    component: AuthLayout,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('./screens/login-screen/login-screen').then(m => m.LoginScreen),
      },
      {
        path: 'registro-usuarios',
        loadComponent: () => import('./screens/registro-usuarios-screen/registro-usuarios-screen').then(m => m.RegistroUsuariosScreen),
      },
      // agregamos una nueva ruta para pasar datos para editar los campos 
      {
        path: 'registro-usuarios/:rol/:id',
        loadComponent: () => import('./screens/registro-usuarios-screen/registro-usuarios-screen').then(m => m.RegistroUsuariosScreen),
      },
    ]
  },

  {
    path: '',
    component: DashboardLayout,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./screens/home-screen/home-screen').then(m => m.HomeScreen),
      },
      {
        path: 'administrador',
        loadComponent: () => import('./screens/admin-screen/admin-screen').then(m => m.AdminScreen),
      },
      {
        path: 'alumnos',
        loadComponent: () => import('./screens/alumno-screen/alumno-screen').then(m => m.AlumnoScreen),
      },
      {
        path: 'maestros',
        loadComponent: () => import('./screens/maestro-screen/maestro-screen').then(m => m.MaestrosScreen),
      },
      {
        path:'graficas',
        loadComponent:() => import('./screens/graficas-screen/graficas-screen').then(m =>m.GraficasScreen),
      }
    ]
  },

  // Retorna a home para cualquier ruta no reconocida

  { path: '**', redirectTo: '/login' },
];