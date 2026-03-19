import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-registro-admin',
  imports: [],
  templateUrl: './regristro-admin.html',
  styleUrl: './regristro-admin.scss',
})
export class RegristroAdmin {

  @Input() rol:string = "";
  @Input() datos_user:any = {};

}