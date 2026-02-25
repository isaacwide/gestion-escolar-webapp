import { Component } from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-login-screen',
  imports: [MatBadgeModule],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.scss',
})
export class LoginScreen {
  hidden: boolean = false; // ← agrega esta línea
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
