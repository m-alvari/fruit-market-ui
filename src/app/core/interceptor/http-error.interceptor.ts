import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          // Handle HTTP errors here
          // You can also log the error, send it to a logging service, or cache it

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'HTTP error occurred',
          });

          // Optionally, you can cache the error here
          // Your caching logic goes here

          // Propagate the error to the calling code
          return throwError(
            () => new Error('Something bad happened; please try again later.'),
          );
        }

        return EMPTY;
      }),
    );
  }
}
