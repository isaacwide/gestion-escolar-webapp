import { Component } from '@angular/core';
import { NavbarUsar } from '../../partials/navbar-usar/navbar-usar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    NavbarUsar,
    RouterModule 
  ],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss',
})
export class DashboardLayout {

}