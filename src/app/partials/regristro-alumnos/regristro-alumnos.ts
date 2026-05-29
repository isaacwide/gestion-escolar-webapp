import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Router, ActivatedRoute } from '@angular/router'; // ✅ Agregar ActivatedRoute
import { Location } from '@angular/common';
import { NotificationService } from '../../servicies/tools/notification-service';
import { AlumnoService } from '../../servicies/alumno-service';

@Component({
  selector: 'app-regristro-alumnos',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './regristro-alumnos.html',
  styleUrl: './regristro-alumnos.scss',
})
export class RegristroAlumnos implements OnInit, OnChanges {
  @Input() rol:string = "";
  @Input() datos_user:any = {};

  public alumno:any={};
  public errors:any={};
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public editar:boolean = false;
  public idUser: number = 0; 
  public posgradoFlag:boolean = false;

  public sexo:any[] =[
    { value: '1', viewValue: 'Masculino' },
    { value: '2', viewValue: 'Fememino' },
    { value: '3', viewValue: 'Prefiero no decirlo' }
  ]

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
    private router: Router,
    private alumnoService: AlumnoService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute 
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['datos_user'] && changes['datos_user'].currentValue){
      this.alumno = this.normalizeAlumno(changes['datos_user'].currentValue);
    }
  }

  ngOnInit() {
    if(this.activatedRoute.snapshot.params['id'] !== undefined){
      this.editar = true;
      this.idUser = this.activatedRoute.snapshot.params['id'];
      this.alumno = this.normalizeAlumno(this.datos_user);
    }else{
      this.alumno = this.alumnoService.esquemaAlumno();
      this.alumno.rol = this.rol;
    }
  }

  private normalizeAlumno(rawAlumno: any) {
    const alumno = rawAlumno ? { ...rawAlumno } : this.alumnoService.esquemaAlumno();
    alumno.materias_json = this.toArray(alumno.materias_json);
    return alumno;
  }

  private toArray(value: any) {
    if (Array.isArray(value)) {
      return value;
    }
    if (value == null) {
      return [];
    }
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch {
        // Ignorar error, intentar separar por comas
      }
      return value.split(',').map((item: string) => item.trim()).filter(Boolean);
    }
    if (typeof value === 'object') {
      return Object.values(value).flat();
    }
    return [];
  }

  public showPassword(){
    if(this.inputType_1 === 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  public showPwdConfirmar(){
    if(this.inputType_2 === 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  public revisarSeleccion(nombre: string){
    this.alumno.materias_json = this.toArray(this.alumno.materias_json);
    return this.alumno.materias_json.includes(nombre);
  }

  public changeFecha(event: any){
    this.alumno.fecha_nacimiento = event.value.toISOString().split("T")[0];
  }

  public regresar(){
    this.location.back();
  }

  public registrar(){
    this.errors = {};
    console.log("Datos del alumno: ", this.alumno);

    this.errors = this.alumnoService.validarAlumno(this.alumno, this.editar);
    if(Object.keys(this.errors).length > 0){
      return;
    }

    if(this.alumno.password === this.alumno.confirmar_password){
      this.alumno.rol = this.rol;
      this.alumnoService.registrarAlumno(this.alumno).subscribe({
        next: (response) => {
          this.notificationService.success("Alumno registrado exitosamente");
          console.log(response);
          this.router.navigate(['/alumnos']);
        },
        error: (error) => {
          console.error("Error al registrar Alumno: ", error);
          this.notificationService.error("Error al registrar Alumno");
        }
      });
    }else{
      this.notificationService.error("Las contraseñas no coinciden");
      this.alumno.password = "";
      this.alumno.confirmar_password = "";
    }
  }

  public actualizar(){

    this.errors = {};
    this.errors = this.alumnoService.validarAlumno(this.alumno, this.editar);
    if(Object.keys(this.errors).length > 0){
      return;
    }

    this.alumnoService.actualizarAlumno(this.alumno).subscribe({
      next: (response) => {
        this.notificationService.success("Alumno actualizado exitosamente");
        console.log(response);
        this.router.navigate(['/alumnos']); // ajusta la ruta según tu app
      },
      error: (error) => {
        console.error("Error al actualizar Alumno: ", error);
        this.notificationService.error("Error al actualizar Alumno");
      }
    });
  }

  public checkboxChange(event: any){
    this.alumno.materias_json = this.toArray(this.alumno.materias_json);
    if(event.checked){
      if(!this.alumno.materias_json.includes(event.source.value)){
        this.alumno.materias_json.push(event.source.value);
      }
    }else{
      const index = this.alumno.materias_json.indexOf(event.source.value);
      if(index >= 0){
        this.alumno.materias_json.splice(index, 1);
      }
    }
  }
}