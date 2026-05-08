import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator-service';
import { ErrorsService } from './tools/erros-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServices } from './auth-services';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {

  constructor(
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private http: HttpClient,  // para manejar las peticiones http 
    private authServices: AuthServices // autn servicis
  ){}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authServices.getSessionToken();
    return token
      ? new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
      : new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  public esquemaAlumno(){
    return{
      'rol':'',
      'matricula':'',
      'first_name':'',
      'last_name':'',
      'email':'',
      'password':'',
      'confirmar_password':'',
      'fecha_nacimiento':'',
      'telefono':'',
      'curp':'',
      'carrera':'',
      'materias_json': []
    }
  }

  public validarAlumno(data:any,editar: boolean){

    let error: any = {};

    //validar formulario de alumno

    // validamos matricula
    if(!this.validatorService.required(data["matricula"])){
      error["matricula"] = this.errorService.required;
    }else if(!this.validatorService.minLen(data["matricula"],8)){
        error["matricula"] = this.errorService.min;
    }else if(!this.validatorService.maxLen(data["matricula"], 9)){
      error["matricula"] = this.errorService.max;
    }

    if(!this.validatorService.required(data["first_name"])){
      error["first_name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["last_name"])){
      error["last_name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["email"])){
      error["email"] = this.errorService.required;
    }else if(!this.validatorService.maxLen(data["email"], 40)){
      error["email"] = this.errorService.max;
    }else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    if(!editar){
      if(!this.validatorService.required(data["password"])){
        error["password"] = this.errorService.required;
      }

      if(!this.validatorService.required(data["confirmar_password"])){
        error["confirmar_password"] = this.errorService.required;
      }
    }

    if(!this.validatorService.required(data["fecha_nacimiento"])){
      error["fecha_nacimiento"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["curp"])){
      error["curp"] = this.errorService.required;
    }else if(!this.validatorService.minLen(data["curp"], 17)){
      error["curp"] = this.errorService.min;
    }else if(!this.validatorService.maxLen(data["curp"], 18)){
      error["curp"] = this.errorService.max;
    }


    if(!this.validatorService.required(data["telefono"])){
      error["telefono"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["carrera"])){
      error["carrera"] = this.errorService.required;
    }
    return error;
  }

  public registrarAlumno(data: any): Observable<any> {
        return this.http.post<any>(`${environment.url_api}/alumno/`, data, { headers: this.getAuthHeaders() });
      }
  
}
