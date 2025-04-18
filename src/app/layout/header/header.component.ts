import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}

  login(): void {
    const username = 'testuser';
    const password = 'testpassword';
    this.authService.login(username, password).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
      },
      error: (error: any) => {
        console.error('Login failed', error);
      },
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
