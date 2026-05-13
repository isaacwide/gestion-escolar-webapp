import { Component, OnInit } from '@angular/core';
import { AdminScreen } from '../admin-screen/admin-screen';
import { MaestrosScreen } from '../maestro-screen/maestro-screen';
import { AlumnoScreen } from '../alumno-screen/alumno-screen';
import { AuthServices } from '../../servicies/auth-services';

@Component({
  selector: 'app-home-screen',
  imports: [
    AdminScreen,
    MaestrosScreen,
    AlumnoScreen
  ],
  templateUrl: './home-screen.html',
  styleUrl: './home-screen.scss',
})
export class HomeScreen implements OnInit {
  public rol: string = '';

  constructor(private authService: AuthServices) {}

  ngOnInit(): void {
    this.rol = this.authService.getUserGroup() ?? '';
  }
}