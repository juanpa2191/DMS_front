import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Memory {
  id: number;
  title: string;
  description: string;
  occurredAt: string;
  createdAt: string;
  status: 'Sospecha' | 'Confirmado';
  createdByUserId: number;
  confirmedByUserId?: number;
}

export interface Place {
  id: number;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  createdByUserId: number;
}

export interface Object {
  id: number;
  name: string;
  description: string;
  createdByUserId: number;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  createdByUserId: number;
}

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  description: string;
  createdByUserId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:44332/api';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Memories
  getMemories(): Observable<Memory[]> {
    return this.http.get<Memory[]>(`${this.baseUrl}/memories`, { headers: this.getHeaders() });
  }

  getMemory(id: number): Observable<Memory> {
    return this.http.get<Memory>(`${this.baseUrl}/memories/${id}`, { headers: this.getHeaders() });
  }

  createMemory(memory: Partial<Memory>): Observable<Memory> {
    return this.http.post<Memory>(`${this.baseUrl}/memories`, memory, { headers: this.getHeaders() });
  }

  updateMemory(id: number, memory: Partial<Memory>): Observable<Memory> {
    return this.http.put<Memory>(`${this.baseUrl}/memories/${id}`, memory, { headers: this.getHeaders() });
  }

  deleteMemory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/memories/${id}`, { headers: this.getHeaders() });
  }

  confirmMemory(memoryId: number, confirmedByUserId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/memories/confirm`, { memoryId, confirmedByUserId }, { headers: this.getHeaders() });
  }

  // Places
  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.baseUrl}/places`, { headers: this.getHeaders() });
  }

  createPlace(place: Partial<Place>): Observable<Place> {
    return this.http.post<Place>(`${this.baseUrl}/places`, place, { headers: this.getHeaders() });
  }

  associatePlaceToMemory(memoryId: number, placeId: number, associatedByUserId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/places/associate`, { memoryId, placeId, associatedByUserId }, { headers: this.getHeaders() });
  }

  // Objects
  getObjects(): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.baseUrl}/objects`, { headers: this.getHeaders() });
  }

  createObject(obj: Partial<Object>): Observable<Object> {
    return this.http.post<Object>(`${this.baseUrl}/objects`, obj, { headers: this.getHeaders() });
  }

  associateObjectToMemory(memoryId: number, objectId: number, associatedByUserId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/objects/associate`, { memoryId, objectId, associatedByUserId }, { headers: this.getHeaders() });
  }

  // Notes
  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.baseUrl}/notes`, { headers: this.getHeaders() });
  }

  createNote(note: Partial<Note>): Observable<Note> {
    return this.http.post<Note>(`${this.baseUrl}/notes`, note, { headers: this.getHeaders() });
  }

  associateNoteToMemory(memoryId: number, noteId: number, associatedByUserId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/notes/associate`, { memoryId, noteId, associatedByUserId }, { headers: this.getHeaders() });
  }

  // People
  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.baseUrl}/people`, { headers: this.getHeaders() });
  }

  createPerson(person: Partial<Person>): Observable<Person> {
    return this.http.post<Person>(`${this.baseUrl}/people`, person, { headers: this.getHeaders() });
  }

  associatePersonToMemory(memoryId: number, personId: number, associatedByUserId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/people/associate`, { memoryId, personId, associatedByUserId }, { headers: this.getHeaders() });
  }

  // Users
  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/me`, { headers: this.getHeaders() });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`, { headers: this.getHeaders() });
  }
}
