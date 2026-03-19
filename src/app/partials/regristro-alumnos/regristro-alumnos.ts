import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-regristro-alumnos',
  imports: [],
  templateUrl: './regristro-alumnos.html',
  styleUrl: './regristro-alumnos.scss',
})
export class RegristroAlumnos {
  @Input() rol:string = "";
  @Input() datos_user:any = {};
}
