import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService, Person } from '../../../services/api.service';

@Component({
  selector: 'app-person-list',
  imports: [CommonModule],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent implements OnInit {
  people: Person[] = [];
  loading = false;
  error = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.loading = true;
    this.error = '';

    this.apiService.getPeople().subscribe({
      next: (people) => {
        this.people = people;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las personas';
        this.loading = false;
      }
    });
  }

  createNewPerson(): void {
    this.router.navigate(['/people/new']);
  }

  editPerson(id: number): void {
    this.router.navigate(['/people', id, 'edit']);
  }

  deletePerson(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta persona?')) {
      // TODO: Implement delete person API call
      this.error = 'Eliminar persona no implementado aún';
    }
  }
}
