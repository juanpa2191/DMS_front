import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService, Person } from '../../../services/api.service';

@Component({
  selector: 'app-person-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss'
})
export class PersonFormComponent implements OnInit {
  personForm: FormGroup;
  loading = false;
  error = '';
  success = false;
  isEditMode = false;
  personId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.personForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.personId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.personId;

    if (this.isEditMode && this.personId) {
      this.loadPerson(this.personId);
    }
  }

  loadPerson(id: number): void {
    this.loading = true;
    // TODO: Implement get person by ID API call
    this.error = 'Cargar persona no implementado aún';
    this.loading = false;
  }

  onSubmit(): void {
    if (this.personForm.valid) {
      this.loading = true;
      this.error = '';

      const personData = {
        ...this.personForm.value,
        createdByUserId: 1 // TODO: Get from auth service
      };

      this.apiService.createPerson(personData).subscribe({
        next: (person) => {
          this.success = true;
          setTimeout(() => {
            this.router.navigate(['/people']);
          }, 2000);
        },
        error: (err) => {
          this.error = 'Error al crear la persona';
          this.loading = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/people']);
  }
}
