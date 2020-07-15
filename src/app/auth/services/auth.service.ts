import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterRequestInterface} from '../types/registerRequest.interface';
import {Observable} from 'rxjs';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {AuthResponseInterface} from '../types/authResponse.interface';
import {LoginRequestInterface} from '../types/loginRequest.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http.post<AuthResponseInterface>(`${environment.apiUrl}/users`, data).pipe(
      map(this.getUser)
    );
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.http.post<AuthResponseInterface>(`${environment.apiUrl}/users/login`, data).pipe(
      map(this.getUser)
    )
  }
}
