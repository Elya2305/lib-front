import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {AlertService} from '../services/alert.service';
import {Status} from '../dto/api';

@Injectable({providedIn: 'root'})
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) {
  }

  private static emptyApiBody(r: HttpResponse<any>): Observable<HttpResponse<any>> {
    return of(
      r.clone<any>({
        body: null,
      }),
    );
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(response => {
      if (response instanceof HttpResponse) {
        const statusResp = response.body.status;
        switch (statusResp) {
          case Status.ERROR:
            this.alertService.danger(response.body.message || 'Something went wrong');
            return ResponseInterceptor.emptyApiBody(response);

          case Status.WARN:
            this.alertService.warning(response.body.message || 'Something went wrong');
            return ResponseInterceptor.emptyApiBody(response);
        }
      }
    }));
  }
}
