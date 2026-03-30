import { Component, Input } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-regristro-alumnos',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './regristro-alumnos.html',
  styleUrl: './regristro-alumnos.scss',
})
export class RegristroAlumnos {
  @Input() rol:string = "";
  @Input() datos_user:any = {};

  public alumno:any={};
  public errors:any={};
  public inputType_1: string = 'password'; //inputs para cada entrada
  public inputType_2: string = 'password';
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public editar:boolean = false;
  public posgradoFlag:boolean = false;

public carrera: any[] = [
  { value: '1', viewValue: 'Ingeniería en Ciencias de la Computación' },
  { value: '2', viewValue: 'Ingeniería en Tecnologías de la Información' },
  { value: '3', viewValue: 'Licenciatura en Ciencias de la Computación' },
];

public posgrado: any[] = [
  { value: '1', viewValue: 'Maestría en Ciencias de la Computación' },
  { value: '2', viewValue: 'Doctorado en Ciencias de la Computación' },
];


 public materias:any[] = [
    {value: '1', nombre: 'Aplicaciones Web'},
    {value: '2', nombre: 'Programación 1'},
    {value: '3', nombre: 'Bases de datos'},
    {value: '4', nombre: 'Tecnologías Web'},
    {value: '5', nombre: 'Minería de datos'},
    {value: '6', nombre: 'Desarrollo móvil'},
    {value: '7', nombre: 'Estructuras de datos'},
    {value: '8', nombre: 'Administración de redes'},
    {value: '9', nombre: 'Ingeniería de Software'},
    {value: '10', nombre: 'Administración de S.O.'},
  ];

constructor(
    private location: Location,
    private router: Router
  ) { }



  public showPassword()
  {
    if(this.inputType_1 === 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }


  public showPwdConfirmar()
  {
    if(this.inputType_2 === 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  public revisarSeleccion(nombre: string){
    if(this.alumno.materias_json){
      const busqueda = this.alumno.materias_json.find((element: string)=>element===nombre);
      if(busqueda !== undefined){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  //Función para detectar el cambio de fecha
  public changeFecha(event :any){
    this.alumno.fecha_nacimiento = event.value.toISOString().split("T")[0];
  }


  public regresar(){
    this.location.back();
  }

  public registrar(){

  }

  public actualizar(){

  }


  public checkboxChange(event:any){
    if(event.checked){
      this.alumno.materias_json.push(event.source.value)
    }else{
      this.alumno.materias_json.forEach((materia: any, i: any) => {
        if(materia === event.source.value){
          this.alumno.materias_json.splice(i,1)
        }
      });
    }
  }
}
