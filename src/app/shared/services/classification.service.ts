import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ClassificationDto, ClassType} from '../dto/book';
import {Observable} from 'rxjs';
import {ApiResponse} from '../dto/api';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class ClassificationService {

  constructor(private http: HttpClient) {
  }

  getByType(classType: ClassType): Observable<ApiResponse<ClassificationDto[]>> {
    return this.http.get<ApiResponse<ClassificationDto[]>>(`${environment.classTypeUrl}`, {
      params: {type: classType}
    });
  }

  getAll(): Observable<ApiResponse<ClassificationDto[]>> {
    return this.http.get<ApiResponse<ClassificationDto[]>>(`${environment.classAllUrl}`);
  }

  create(classification: ClassificationDto): Observable<ApiResponse<ClassificationDto>> {
    return this.http.post<ApiResponse<ClassificationDto>>(`${environment.classTypeUrl}`, classification);
  }

  edit(classification: ClassificationDto): Observable<ApiResponse<ClassificationDto>> {
    return this.http.put<ApiResponse<ClassificationDto>>(`${environment.classTypeUrl}`, classification);
  }

  delete(classification: ClassificationDto): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${environment.classTypeDeleteUrl}`, classification);
  }
}
