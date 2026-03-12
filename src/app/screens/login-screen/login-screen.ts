import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.scss',
})
export class LoginScreen implements OnInit{
  // aqui va las variables globales 
  public username:string='';
  public password:string='';
  public load:boolean=false;
  public error:any={};
  public type:string="password"

  constructor( 
    public router:Router
  ){}
  // primera ves que  queremos que se ejecute la aplicacion 
  ngOnInit(): void {
    
  }

  public login(){

  }
  public registrar(){

  }

  public showPassword(){

  }


}
