import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  currentUser: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  navigateToMemories(): void {
    this.router.navigate(['/memories']);
  }

  navigateToPlaces(): void {
    this.router.navigate(['/places']);
  }

  navigateToObjects(): void {
    this.router.navigate(['/objects']);
  }

  navigateToNotes(): void {
    this.router.navigate(['/notes']);
  }

  navigateToPeople(): void {
    this.router.navigate(['/people']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
