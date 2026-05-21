import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
export class AlumnoScreen implements OnInit, AfterViewInit {

  public name_user: string = "";
  public lista_alumno: any[] = [];

  public displayedColumns: string[] = [
    'matricula',
    'nombre',
    'apellidos',
    'email',
    'curp',
    'carrera',
    'editar',
    'eliminar'
  ];

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;

  constructor(
    private authService: AuthServices,
    private notificationService: NotificationService,
    private alumnoService: AlumnoService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.name_user = this.authService.getUserCompleteName();
    this.obtenerAlumnos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('AlumnoScreen ngAfterViewInit - paginator, sort:', this.paginator, this.sort);
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

        this.dataSource.data = this.lista_alumno;

        this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string) => {
          if (sortHeaderId === 'nombre') {
            return `${data.first_name || ''}`.toLowerCase();
          }
          if (sortHeaderId === 'apellidos') {
            return `${data.last_name || ''}`.toLowerCase();
          }
          return data[sortHeaderId];
        };

        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const nombre = `${data.first_name} ${data.last_name}`.toLowerCase();
          return nombre.includes(filter);
        };
        // force change detection so template children (paginator/sort) are created
        this.cdr.detectChanges();

        // Now ViewChild references should be available — assign paginator/sort
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
          this.paginator.length = this.dataSource.data.length;
        }
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }

        // debug info
        console.log('AlumnoScreen after data load - paginator:', this.paginator, 'data length:', this.dataSource.data.length);
      },
      error: () => {
        this.notificationService.error('Error al cargar la lista de Alumnos.');
      }
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  public goEditar(id: number): void {
    this.router.navigate(['/registro-usuarios', 'alumno', id]);
  }

  public delete(id: number): void {}
}