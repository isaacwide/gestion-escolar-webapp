import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { AuthServices } from '../../servicies/auth-services';
import { NotificationService } from '../../servicies/tools/notification-service';
import { AlumnoService } from '../../servicies/alumno-service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-alumno-screen',
  imports: [...SHARED_IMPORTS], 
  templateUrl: './alumno-screen.html',
  styleUrl: './alumno-screen.scss',
})
export class AlumnoScreen implements OnInit {

  public name_user: string = "";
  public lista_alumno: any[] = [];

  public displayedColumns: string[] = [
    'matricula',
    'nombre',
    'email',
    'curp',
    'carrera',
    'editar',
    'eliminar'
  ];

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authService: AuthServices,
    private notificationService: NotificationService,
    private alumnoService: AlumnoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.name_user = this.authService.getUserCompleteName();
    this.obtenerAlumnos();
  }


  public obtenerAlumnos(): void {
    this.alumnoService.obtenerAlumnos().subscribe({
      next: (response) => {
        this.lista_alumno = response;

    
        this.lista_alumno.forEach((alumno) => {
          alumno.first_name = alumno.user?.first_name || alumno.first_name;
          alumno.last_name = alumno.user?.last_name || alumno.last_name;
          alumno.email = alumno.user?.email || alumno.email;
        });

        this.dataSource = new MatTableDataSource<any>(this.lista_alumno);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const nombre = `${data.first_name} ${data.last_name}`.toLowerCase();
          return nombre.includes(filter);
        };
      },
      error: () => {
        this.notificationService.error('Error al cargar la lista de Alumnos.');
      }
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public goEditar(id: number): void {
    this.router.navigate(['/registro-usuarios', 'alumno', id]);
  }

  public delete(id: number): void {}
}