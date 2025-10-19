import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService, Place } from '../../../services/api.service';

@Component({
  selector: 'app-place-list',
  imports: [CommonModule],
  templateUrl: './place-list.component.html',
  styleUrl: './place-list.component.scss'
})
export class PlaceListComponent implements OnInit {
  places: Place[] = [];
  loading = false;
  error = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPlaces();
  }

  loadPlaces(): void {
    this.loading = true;
    this.error = '';

    this.apiService.getPlaces().subscribe({
      next: (places) => {
        this.places = places;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los lugares';
        this.loading = false;
      }
    });
  }

  createNewPlace(): void {
    this.router.navigate(['/places/new']);
  }

  editPlace(id: number): void {
    this.router.navigate(['/places', id, 'edit']);
  }

  deletePlace(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este lugar?')) {
      // TODO: Implement delete place API call
      this.error = 'Eliminar lugar no implementado aún';
    }
  }
}
