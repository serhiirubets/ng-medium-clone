import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {PersistenceService} from '../../../shared/services/persistence.service';
import {Router} from '@angular/router';
import {loginAction, loginFailureAction, loginSuccessAction} from '../actions/login.action';

@Injectable()
export class LoginEffect {
  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private persistenceService: PersistenceService,
    private router: Router,
  ) {
  }

  redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccessAction),
    tap(() => {
      this.router.navigateByUrl('/');
    })
  ), { dispatch: false }) // dispatch false, because we don't return action, so we should not dispatch

  login$ = createEffect(() => this.actions$.pipe(
    ofType(loginAction),
    switchMap(({request}) => {
      return this.auth.login(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          this.persistenceService.set('accessToken', currentUser.token);
          return loginSuccessAction({currentUser});
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(loginFailureAction({ errors: errorResponse.error.errors }));
        })
      );
    })
  ))
}


// Обновить сервис
// Добавить action type
// новые action
// новые effect
// обновить reducer
