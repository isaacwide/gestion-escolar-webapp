import { Component, OnInit, Inject } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Location } from '@angular/common';
import { MatRadioChange } from '@angular/material/radio';
import { AuthServices } from '../../servicies/auth-services';
import { RegristroAlumnos } from '../../partials/regristro-alumnos/regristro-alumnos';
import { RegristroAdmin } from '../../partials/regristro-admin/regristro-admin';
import { RegristroMaestros } from '../../partials/regristro-maestros/regristro-maestros';


@Component({
  selector: 'app-registro-usuarios-screen',
  imports: [
    ...SHARED_IMPORTS,
    RegristroAdmin,
    RegristroAlumnos,
    RegristroMaestros
  ],
  templateUrl: './registro-usuarios-screen.html',
  styleUrl: './registro-usuarios-screen.scss',
})
export class RegistroUsuariosScreen implements OnInit {

  public tipo:string = "registro-usuarios";
  public user:any = {};
  public editar:boolean = false;
  public rol:string = "";
  public idUser:number = 0;

  //Banderas para el tipo de usuario
  public isAdmin:boolean = false;
  public isAlumno:boolean = false;
  public isMaestro:boolean = false;

  public tipo_user:string = "";

  constructor(
    private location: Location,
    public authService: AuthServices
  ) { }

  ngOnInit(): void {
  }

  public radioChange(event: MatRadioChange) {
    if(event.value === "administrador"){
      this.isAdmin = true;
      this.isAlumno = false;
      this.isMaestro = false;
      this.tipo_user = "administrador";
    }else if (event.value === "alumno"){
      this.isAdmin = false;
      this.isAlumno = true;
      this.isMaestro = false;
      this.tipo_user = "alumno";
    }else if (event.value === "maestro"){
      this.isAdmin = false;
      this.isAlumno = false;
      this.isMaestro = true;
      this.tipo_user = "maestro";
    }
  }

  //Función para regresar a la pantalla anterior
  public goBack() {
    this.location.back();
  }

}