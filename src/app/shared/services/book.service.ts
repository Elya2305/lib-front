import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ApiPageResponse, ApiResponse} from '../dto/api';
import {BookDetailsDto, BookDto, SearchBookDto} from '../dto/book';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class BookService {

  constructor(private http: HttpClient) {
  }

  search(search, page, pageSize): Observable<ApiPageResponse<SearchBookDto>> {
    return this.http.get<ApiPageResponse<SearchBookDto>>(`${environment.searchBookUrl}`, {
      params: {search, page, pageSize}
    });
  }

  getBooks(page, pageSize): Observable<ApiPageResponse<BookDto>> {
    return this.http.get<ApiPageResponse<BookDto>>(`${environment.booksUrl}`, {
      params: {page, pageSize}
    });
  }

  getBookById(id): Observable<ApiResponse<BookDto>> {
    return this.http.get<ApiResponse<BookDto>>(`${environment.booksUrl}/${id}`);
  }

  createBook(bookDto: BookDto): Observable<ApiResponse<BookDto>> {
    return this.http.post<ApiResponse<BookDto>>(`${environment.booksUrl}`, bookDto);
  }

  updateBook(bookDto: BookDto): Observable<ApiResponse<BookDto>> {
    return this.http.put<ApiResponse<BookDto>>(`${environment.booksUrl}`, bookDto);
  }

  deleteBook(id): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${environment.booksUrl}`, {
      params: {id}
    });
  }

  searchLocal(search, page, pageSize): Observable<ApiPageResponse<BookDto>> {
    return this.http.get<ApiPageResponse<BookDto>>(`${environment.searchLocalBookUrl}`, {
      params: {search, page, pageSize}
    });
  }

  getDetails(selfLink): Observable<ApiResponse<BookDetailsDto>> {
    return this.http.get<ApiResponse<BookDetailsDto>>(`${environment.detailsBookUrl}`, {
      params: {selfLink}
    });
  }
}
