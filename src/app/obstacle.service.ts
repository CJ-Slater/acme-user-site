import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Obstacle } from '../models/obstacle.model';

@Injectable({
  providedIn: 'root'
})
export class ObstacleService {

  private apiUrl = 'https://localhost:7127/Obstacle';
  constructor(private http: HttpClient) {}

  // Upload forklift file to backend
  uploadForkliftFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/import`, formData);
  }

  resetObstacles() {
    return this.http.delete(`${this.apiUrl}/reset`);
  }

  moveForklift(forkliftName: string, commandString: string){
    return this.http.patch(`${this.apiUrl}/move/${forkliftName}`, commandString);
  }

  getObstacles(): Observable<Obstacle[]> {
    return this.http.get<Obstacle[]>(`${this.apiUrl}/get-all`);
  }

}


