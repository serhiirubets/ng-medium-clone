import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterRequestInterface} from '../types/registerRequest.interface';
import {Observable} from 'rxjs';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {AuthResponseInterface} from '../types/authResponse.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }
  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http.post<AuthResponseInterface>(`${environment.apiUrl}/users`, data).pipe(
      map((r: AuthResponseInterface) => r.user)
    );
  }
}
