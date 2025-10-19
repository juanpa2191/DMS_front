import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService, Memory } from '../../../services/api.service';

@Component({
  selector: 'app-memory-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './memory-form.component.html',
  styleUrl: './memory-form.component.scss'
})
export class MemoryFormComponent implements OnInit {
  memoryForm: FormGroup;
  loading = false;
  error = '';
  success = false;
  isEditMode = false;
  memoryId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.memoryForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      occurredAt: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.memoryId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.memoryId;

    if (this.isEditMode && this.memoryId) {
      this.loadMemory(this.memoryId);
    }
  }

  loadMemory(id: number): void {
    this.loading = true;
    this.apiService.getMemory(id).subscribe({
      next: (memory) => {
        this.memoryForm.patchValue({
          title: memory.title,
          description: memory.description,
          occurredAt: new Date(memory.occurredAt).toISOString().split('T')[0]
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el recuerdo';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.memoryForm.valid) {
      this.loading = true;
      this.error = '';

      const memoryData = {
        ...this.memoryForm.value,
        occurredAt: new Date(this.memoryForm.value.occurredAt).toISOString(),
        createdByUserId: 1 // TODO: Get from auth service
      };

      const operation = this.isEditMode && this.memoryId
        ? this.apiService.updateMemory(this.memoryId, memoryData)
        : this.apiService.createMemory(memoryData);

      operation.subscribe({
        next: (memory) => {
          this.success = true;
          setTimeout(() => {
            this.router.navigate(['/memories']);
          }, 2000);
        },
        error: (err) => {
          this.error = this.isEditMode ? 'Error al actualizar el recuerdo' : 'Error al crear el recuerdo';
          this.loading = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/memories']);
  }
}
