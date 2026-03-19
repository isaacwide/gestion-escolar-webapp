import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-regristro-maestros',
  imports: [],
  templateUrl: './regristro-maestros.html',
  styleUrl: './regristro-maestros.scss',
})
export class RegristroMaestros {
  @Input() rol:string = "";
  @Input() datos_user:any = {};

}
