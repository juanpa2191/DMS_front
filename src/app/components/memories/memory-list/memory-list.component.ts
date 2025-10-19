import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService, Memory } from '../../../services/api.service';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';

@Component({
  selector: 'app-memory-list',
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './memory-list.component.html',
  styleUrl: './memory-list.component.scss'
})
export class MemoryListComponent implements OnInit {
  memories: Memory[] = [];
  filteredMemories: Memory[] = [];
  loading = false;
  error = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMemories();
  }

  loadMemories(): void {
    this.loading = true;
    this.error = '';

    this.apiService.getMemories().subscribe({
      next: (memories) => {
        this.memories = memories;
        this.filteredMemories = memories;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los recuerdos';
        this.loading = false;
      }
    });
  }

  onSearch(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filteredMemories = this.memories;
    } else {
      const term = searchTerm.toLowerCase();
      this.filteredMemories = this.memories.filter(memory =>
        memory.title.toLowerCase().includes(term) ||
        memory.description.toLowerCase().includes(term)
      );
    }
  }

  viewMemory(id: number): void {
    this.router.navigate(['/memories', id]);
  }

  editMemory(id: number): void {
    this.router.navigate(['/memories', id, 'edit']);
  }

  deleteMemory(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este recuerdo?')) {
      this.apiService.deleteMemory(id).subscribe({
        next: () => {
          this.loadMemories();
        },
        error: (err) => {
          this.error = 'Error al eliminar el recuerdo';
        }
      });
    }
  }

  confirmMemory(memory: Memory): void {
    if (confirm('¿Estás seguro de que quieres confirmar este recuerdo?')) {
      this.apiService.confirmMemory(memory.id, 1).subscribe({ // TODO: Get current user ID
        next: () => {
          this.loadMemories();
        },
        error: (err) => {
          this.error = 'Error al confirmar el recuerdo';
        }
      });
    }
  }

  createNewMemory(): void {
    this.router.navigate(['/memories/new']);
  }
}
