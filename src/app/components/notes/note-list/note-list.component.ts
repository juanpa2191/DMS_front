import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService, Note } from '../../../services/api.service';

@Component({
  selector: 'app-note-list',
  imports: [CommonModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];
  loading = false;
  error = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.loading = true;
    this.error = '';

    this.apiService.getNotes().subscribe({
      next: (notes) => {
        this.notes = notes;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las notas';
        this.loading = false;
      }
    });
  }

  createNewNote(): void {
    this.router.navigate(['/notes/new']);
  }

  editNote(id: number): void {
    this.router.navigate(['/notes', id, 'edit']);
  }

  deleteNote(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
      // TODO: Implement delete note API call
      this.error = 'Eliminar nota no implementado aún';
    }
  }
}
