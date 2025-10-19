import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService, Place } from '../../../services/api.service';

@Component({
  selector: 'app-place-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './place-form.component.html',
  styleUrl: './place-form.component.scss'
})
export class PlaceFormComponent implements OnInit {
  placeForm: FormGroup;
  loading = false;
  error = '';
  success = false;
  isEditMode = false;
  placeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.placeForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      address: ['', [Validators.required]],
      latitude: [''],
      longitude: ['']
    });
  }

  ngOnInit(): void {
    this.placeId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.placeId;

    if (this.isEditMode && this.placeId) {
      this.loadPlace(this.placeId);
    }
  }

  loadPlace(id: number): void {
    this.loading = true;
    // TODO: Implement get place by ID API call
    this.error = 'Cargar lugar no implementado aún';
    this.loading = false;
  }

  onSubmit(): void {
    if (this.placeForm.valid) {
      this.loading = true;
      this.error = '';

      const placeData = {
        ...this.placeForm.value,
        latitude: this.placeForm.value.latitude ? parseFloat(this.placeForm.value.latitude) : null,
        longitude: this.placeForm.value.longitude ? parseFloat(this.placeForm.value.longitude) : null,
        createdByUserId: 1 // TODO: Get from auth service
      };

      this.apiService.createPlace(placeData).subscribe({
        next: (place) => {
          this.success = true;
          setTimeout(() => {
            this.router.navigate(['/places']);
          }, 2000);
        },
        error: (err) => {
          this.error = 'Error al crear el lugar';
          this.loading = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/places']);
  }
}
