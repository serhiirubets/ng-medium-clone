import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction
} from "../actions/updateCurrentUser.action";

@Injectable()
export class UpdateCurrentUserEffect {
  constructor(
    private actions$: Actions,
    private auth: AuthService,
  ) {
  }

  updateCurrentUser$ = createEffect(() => this.actions$.pipe(
    ofType(updateCurrentUserAction),
    switchMap(({currentUserInput}) => {
      return this.auth.updateCurrentUser(currentUserInput).pipe(
        map((currentUser: CurrentUserInterface) => {
          return updateCurrentUserSuccessAction({currentUser});
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(updateCurrentUserFailureAction({ errors: errorResponse.error.errors }));
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
