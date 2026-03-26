import { Component, Input, OnInit } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-registro-admin',
  imports: [MatFormField, MatLabel ,MatDatepickerModule
    ,...SHARED_IMPORTS
  ],
  templateUrl: './regristro-admin.html',
  styleUrl: './regristro-admin.scss',
})
export class RegristroAdmin implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public admin:any={};
  public errors:any={};
  public editar:boolean= false;



  @Input() rol:string = "";
  @Input() datos_user:any = {};

  constructor(){

  }

}