import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService, Memory, Place, Object, Note, Person } from '../../../services/api.service';

@Component({
  selector: 'app-memory-detail',
  imports: [CommonModule],
  templateUrl: './memory-detail.component.html',
  styleUrl: './memory-detail.component.scss'
})
export class MemoryDetailComponent implements OnInit {
  memory: Memory | null = null;
  places: Place[] = [];
  objects: Object[] = [];
  notes: Note[] = [];
  people: Person[] = [];
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadMemory(+id);
    }
  }

  loadMemory(id: number): void {
    this.loading = true;
    this.apiService.getMemory(id).subscribe({
      next: (memory) => {
        this.memory = memory;
        this.loading = false;
        // TODO: Load associated places, objects, notes, and people
      },
      error: (err) => {
        this.error = 'Error al cargar el recuerdo';
        this.loading = false;
      }
    });
  }

  editMemory(): void {
    if (this.memory) {
      this.router.navigate(['/memories', this.memory.id, 'edit']);
    }
  }

  deleteMemory(): void {
    if (this.memory && confirm('¿Estás seguro de que quieres eliminar este recuerdo?')) {
      this.apiService.deleteMemory(this.memory.id).subscribe({
        next: () => {
          this.router.navigate(['/memories']);
        },
        error: (err) => {
          this.error = 'Error al eliminar el recuerdo';
        }
      });
    }
  }

  confirmMemory(): void {
    if (this.memory && confirm('¿Estás seguro de que quieres confirmar este recuerdo?')) {
      this.apiService.confirmMemory(this.memory.id, 1).subscribe({ // TODO: Get current user ID
        next: () => {
          this.loadMemory(this.memory!.id);
        },
        error: (err) => {
          this.error = 'Error al confirmar el recuerdo';
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/memories']);
  }
}
