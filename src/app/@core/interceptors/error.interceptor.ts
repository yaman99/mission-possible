import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorFilterHandler } from '../errors/errorFilterHanlder';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorFilterHanlder: ErrorFilterHandler) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.error instanceof ErrorEvent) {
          console.log('Client Side Error', err.error.message);
        } else if (err.status === 0) {
          console.log('Unable to Connect to the Server');
        } else {
          this.errorFilterHanlder.onExecute(err);
        }
        throw new Error(err.message);
      })
    );
  }
}
