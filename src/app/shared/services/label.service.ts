import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../dto/api';
import {LabelDto} from '../dto/book';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class LabelService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<ApiResponse<LabelDto[]>> {
    return this.http.get<ApiResponse<LabelDto[]>>(`${environment.labelUrl}`);
  }
}
