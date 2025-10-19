import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService, Note } from '../../../services/api.service';

@Component({
  selector: 'app-note-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.scss'
})
export class NoteFormComponent implements OnInit {
  noteForm: FormGroup;
  loading = false;
  error = '';
  success = false;
  isEditMode = false;
  noteId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.noteId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.noteId;

    if (this.isEditMode && this.noteId) {
      this.loadNote(this.noteId);
    }
  }

  loadNote(id: number): void {
    this.loading = true;
    // TODO: Implement get note by ID API call
    this.error = 'Cargar nota no implementado aún';
    this.loading = false;
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      this.loading = true;
      this.error = '';

      const noteData = {
        ...this.noteForm.value,
        createdByUserId: 1 // TODO: Get from auth service
      };

      this.apiService.createNote(noteData).subscribe({
        next: (note) => {
          this.success = true;
          setTimeout(() => {
            this.router.navigate(['/notes']);
          }, 2000);
        },
        error: (err) => {
          this.error = 'Error al crear la nota';
          this.loading = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/notes']);
  }
}
