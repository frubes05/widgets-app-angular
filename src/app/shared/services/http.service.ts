import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { CacheService, ErrorHandlerService } from '@shared/services';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly http = inject(HttpClient);
  private readonly cacheService = inject(CacheService);
  private readonly errorHandler = inject(ErrorHandlerService);

  request<T>(url: string): Observable<T> {
    if (this.cacheService.has(url)) {
      const cached = this.cacheService.get<T>(url)!;
      return of(cached);
    }

    return this.http.get<T>(url).pipe(
      tap(response => this.cacheService.set(url, response)),
      catchError(error => {
        this.errorHandler.handle(error);
        return throwError(() => error);
      })
    );
  }
}