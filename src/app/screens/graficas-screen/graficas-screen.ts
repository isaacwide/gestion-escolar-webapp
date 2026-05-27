import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { AdministradoresService } from '../../servicies/administradores-service';
import { NotificationService } from '../../servicies/tools/notification-service';

@Component({
  selector: 'app-graficas-screen',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './graficas-screen.html',
  styleUrl: './graficas-screen.scss',
})
export class GraficasScreen implements OnInit{
  //Agregar chartjs-plugin-datalabels
  //Variables

  public total_user: any = {};
  public datos:number[] = [];
  

  //Histograma
  
  lineChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data:[0, 0, 0],
        label: 'Registro de usuarios',
        backgroundColor: '#F88406'
      }
    ]
  }
  lineChartOption = {
    responsive:false
  }
  lineChartPlugins = [ DatalabelsPlugin ];

  //Barras
  barChartData = {
    labels: ["Congreso", "FePro", "Presentación Doctoral", "Feria Matemáticas", "T-System"],
    datasets: [
      {
        data:[34, 43, 54, 28, 74],
        label: 'Eventos Académicos',
        backgroundColor: [
          '#F88406',
          '#FCFF44',
          '#82D3FB',
          '#FB82F5',
          '#2AD84A'
        ]
      }
    ]
  }
  barChartOption = {
    responsive:false
  }
  barChartPlugins = [ DatalabelsPlugin ];

  //Circular
  pieChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data:[0, 0, 0],
        label: 'Registro de usuarios',
        backgroundColor: [
          '#FCFF44',
          '#F1C8F2',
          '#31E731'
        ]
      }
    ]
  }
  pieChartOption = {
    responsive:false
  }
  pieChartPlugins = [ DatalabelsPlugin ];

  // Doughnut
  doughnutChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data:[0, 0, 0],
        label: 'Registro de usuarios',
        backgroundColor: [
          '#F88406',
          '#FCFF44',
          '#31E7E7'
        ]
      }
    ]
  }
  doughnutChartOption = {
    responsive:false
  }
  doughnutChartPlugins = [ DatalabelsPlugin ];

  constructor(
    private notificationService: NotificationService,
    private administradoresServices: AdministradoresService
  ) { }

  ngOnInit(): void {
    this.obtenerTotalUsers();
  }

  // Función para obtener el total de usuarios registrados
  public obtenerTotalUsers(){
    this.administradoresServices.getTotalUsuarios().subscribe(
      (response)=>{
        this.total_user = response;

        this.datos[0] = this.total_user.administradores;
        this.datos[1] = this.total_user.maestros;
        this.datos[2] = this.total_user.alumnos;

        this.lineChartData = {

          labels: ["Administradores", "Maestros", "Alumnos"],
          datasets: [
            {
              data:[this.total_user.total_admins,
            this.total_user.total_maestros,
            this.total_user.total_alumnos],
              label: 'Registro de usuarios',
              backgroundColor: '#F88406'
            }
          ]

        };

        this.lineChartOption = {
          responsive:false
        }
        this.lineChartPlugins = [ DatalabelsPlugin ];


        //Circular
        this.pieChartData = {
          labels: ["Administradores", "Maestros", "Alumnos"],
          datasets: [
            {
              data:[this.total_user.total_admins,
                    this.total_user.total_maestros,
                    this.total_user.total_alumnos],
              label: 'Registro de usuarios',
              backgroundColor: [
                '#FCFF44',
                '#F1C8F2',
                '#31E731'
              ]
            }
          ]
        }
        this.pieChartOption = {
          responsive:false
        }
        this.pieChartPlugins = [ DatalabelsPlugin ];



        this.doughnutChartData = {
          labels: ["Administradores", "Maestros", "Alumnos"],
          datasets: [
            {
              data:[this.total_user.total_admins,
                    this.total_user.total_maestros,
                    this.total_user.total_alumnos],
              label: 'Registro de usuarios',
              backgroundColor: [
                '#F88406',
                '#FCFF44',
                '#31E7E7'
              ]
            }
          ]
        }
        this.doughnutChartOption = {
          responsive:false
        }
        this.doughnutChartPlugins = [ DatalabelsPlugin ];

        console.log("Total de usuarios: ", this.total_user);

        
        this.notificationService.success("Total de usuarios registrados por cada rol obtenido correctamente");
      }, (error)=>{
        this.notificationService.error("No se pudo obtener el total de cada rol de usuarios");
      }
    );
  }

}