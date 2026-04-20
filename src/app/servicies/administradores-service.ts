import { Injectable } from '@angular/core';

// usaremos servicios 

@Injectable({
  providedIn: 'root',
})
export class AdministradoresService {


  constructor(){}

  // funcionnesquema admin 
  public esquemaAdmin(){
    return{
      'rol':''

    }
  }


  public validarAdmin(data:any,editar:boolean){

    let error:any= {

    }

    



    return error;

  }
  
}
