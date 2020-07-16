import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PersistenceService} from './persistence.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private persistanceService: PersistenceService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.persistanceService.get('accessToken');
    req = req.clone({
      setHeaders: {
        Authorization: token ? `Token ${token}` : '',
      }
    });

    return next.handle(req);
  }

}
