import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService, Object } from '../../../services/api.service';

@Component({
  selector: 'app-object-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './object-form.component.html',
  styleUrl: './object-form.component.scss'
})
export class ObjectFormComponent implements OnInit {
  objectForm: FormGroup;
  loading = false;
  error = '';
  success = false;
  isEditMode = false;
  objectId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.objectForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.objectId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.objectId;

    if (this.isEditMode && this.objectId) {
      this.loadObject(this.objectId);
    }
  }

  loadObject(id: number): void {
    this.loading = true;
    // TODO: Implement get object by ID API call
    this.error = 'Cargar objeto no implementado aún';
    this.loading = false;
  }

  onSubmit(): void {
    if (this.objectForm.valid) {
      this.loading = true;
      this.error = '';

      const objectData = {
        ...this.objectForm.value,
        createdByUserId: 1 // TODO: Get from auth service
      };

      this.apiService.createObject(objectData).subscribe({
        next: (object) => {
          this.success = true;
          setTimeout(() => {
            this.router.navigate(['/objects']);
          }, 2000);
        },
        error: (err) => {
          this.error = 'Error al crear el objeto';
          this.loading = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/objects']);
  }
}
