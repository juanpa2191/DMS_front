import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MemoryListComponent } from './components/memories/memory-list/memory-list.component';
import { MemoryFormComponent } from './components/memories/memory-form/memory-form.component';
import { MemoryDetailComponent } from './components/memories/memory-detail/memory-detail.component';
import { PlaceListComponent } from './components/places/place-list/place-list.component';
import { PlaceFormComponent } from './components/places/place-form/place-form.component';
import { ObjectListComponent } from './components/objects/object-list/object-list.component';
import { ObjectFormComponent } from './components/objects/object-form/object-form.component';
import { NoteListComponent } from './components/notes/note-list/note-list.component';
import { NoteFormComponent } from './components/notes/note-form/note-form.component';
import { PersonListComponent } from './components/people/person-list/person-list.component';
import { PersonFormComponent } from './components/people/person-form/person-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'memories', component: MemoryListComponent },
  { path: 'memories/new', component: MemoryFormComponent },
  { path: 'memories/:id', component: MemoryDetailComponent },
  { path: 'memories/:id/edit', component: MemoryFormComponent },
  { path: 'places', component: PlaceListComponent },
  { path: 'places/new', component: PlaceFormComponent },
  { path: 'places/:id/edit', component: PlaceFormComponent },
  { path: 'objects', component: ObjectListComponent },
  { path: 'objects/new', component: ObjectFormComponent },
  { path: 'objects/:id/edit', component: ObjectFormComponent },
  { path: 'notes', component: NoteListComponent },
  { path: 'notes/new', component: NoteFormComponent },
  { path: 'notes/:id/edit', component: NoteFormComponent },
  { path: 'people', component: PersonListComponent },
  { path: 'people/new', component: PersonFormComponent },
  { path: 'people/:id/edit', component: PersonFormComponent },
];
