import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { MatTableDataSource } from '@angular/material/table';
import { DatosMaestro } from '../../interfaces/usuarios-interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'; // ✅ Agregar
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaestrosService } from '../../servicies/maestros-service';
import { NotificationService } from '../../servicies/tools/notification-service';
import { AuthServices } from '../../servicies/auth-services';

@Component({
  selector: 'app-maestros-screen',
  imports: [...SHARED_IMPORTS],
  templateUrl: './maestro-screen.html',
  styleUrl: './maestro-screen.scss',
})
export class MaestrosScreen implements OnInit, AfterViewInit{

  public name_user: string = '';
  public rol: string = '';
  public lista_maestros: any[] = [];

  public displayedColumns: string[] = [
    'id_trabajador', 'nombre', 'email', 'fecha_nacimiento',
    'telefono', 'rfc', 'cubiculo', 'area_investigacion', 'editar', 'eliminar'
  ];

  dataSource = new MatTableDataSource<DatosMaestro>([]);

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort; // ✅ Agregar

  constructor(
    private authService: AuthServices,
    private maestrosService: MaestrosService,
    private notificationService: NotificationService,
    private router: Router,
    private dialog: MatDialog
    , private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.name_user = this.authService.getUserCompleteName();
    this.rol = this.authService.getUserGroup();
    this.obtenerMaestros();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('MaestrosScreen ngAfterViewInit - paginator, sort:', this.paginator, this.sort);
  }


  public obtenerMaestros(): void {
    this.maestrosService.obtenerListaMaestros().subscribe({
      next: (response) => {
        this.lista_maestros = response;
        this.lista_maestros.forEach((usuario) => {
          usuario.first_name = usuario.user.first_name;
          usuario.last_name = usuario.user.last_name;
          usuario.email = usuario.user.email;
        });

        this.dataSource.data = this.lista_maestros as DatosMaestro[];

        this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string) => {
          if (sortHeaderId === 'nombre') {
            return `${data.first_name || ''}`.toLowerCase();
          }
          // allow other columns to sort by their property value
          return data[sortHeaderId];
        };

        // ✅ Filtro por nombre
            this.dataSource.filterPredicate = (data: any, filter: string) => {
              const nombre = `${data.first_name} ${data.last_name}`.toLowerCase();
              return nombre.includes(filter);
            };

            // force change detection so paginator/sort children are created
            this.cdr.detectChanges();

            if (this.paginator) {
              this.dataSource.paginator = this.paginator;
              this.paginator.length = this.dataSource.data.length;
            }
            if (this.sort) {
              this.dataSource.sort = this.sort;
            }

            console.log('MaestrosScreen after data load - paginator:', this.paginator, 'data length:', this.dataSource.data.length);
      },
      error: () => {
        this.notificationService.error('No se pudo obtener la lista de maestros');
      }
    });
  }

   
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  public goEditar(idUser: number) {
    this.router.navigate(['/registro-usuarios', 'maestro', idUser]);
  }

  public delete(idUser: number) {}
}