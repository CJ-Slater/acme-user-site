import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Forklift } from '../models/forklift.model';
import { MovementResult } from '../models/movementresult.model';

@Injectable({
  providedIn: 'root'
})
export class ForkliftService {

  private apiUrl = 'https://localhost:7127/Forklift';
  constructor(private http: HttpClient) {}

  // Upload forklift file to backend
  uploadForkliftFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/import`, formData);
  }

  deleteForklifts() {
    return this.http.delete(`${this.apiUrl}/delete-all`);
  }

  moveForklift(forkliftName: string, commandString: string){
    return this.http.patch<MovementResult>(`${this.apiUrl}/move/${forkliftName}`, {commandString});
  }

  getAllForklifts(): Observable<Forklift[]> {
    return this.http.get<Forklift[]>(`${this.apiUrl}/get-all`);
  }

}


