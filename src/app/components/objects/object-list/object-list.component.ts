import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService, Object } from '../../../services/api.service';

@Component({
  selector: 'app-object-list',
  imports: [CommonModule],
  templateUrl: './object-list.component.html',
  styleUrl: './object-list.component.scss'
})
export class ObjectListComponent implements OnInit {
  objects: Object[] = [];
  loading = false;
  error = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadObjects();
  }

  loadObjects(): void {
    this.loading = true;
    this.error = '';

    this.apiService.getObjects().subscribe({
      next: (objects) => {
        this.objects = objects;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los objetos';
        this.loading = false;
      }
    });
  }

  createNewObject(): void {
    this.router.navigate(['/objects/new']);
  }

  editObject(id: number): void {
    this.router.navigate(['/objects', id, 'edit']);
  }

  deleteObject(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este objeto?')) {
      // TODO: Implement delete object API call
      this.error = 'Eliminar objeto no implementado aún';
    }
  }
}
