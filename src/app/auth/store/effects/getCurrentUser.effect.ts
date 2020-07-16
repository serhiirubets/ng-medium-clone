import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {of} from 'rxjs';
import {PersistenceService} from '../../../shared/services/persistence.service';
import {
  getCurrentUserAction,
  getCurrentUserSuccessAction,
  getCurrentUserFailureAction
} from '../actions/getCurrentUser.action';

@Injectable()
export class GetCurrentUserEffect {
  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private persistenceService: PersistenceService,
  ) {
  }


  getCurrentUser$ = createEffect(() => this.actions$.pipe(
    ofType(getCurrentUserAction),
    switchMap(() => {
      const token = this.persistenceService.get('accessToken');

      if (!token) {
        return of(getCurrentUserFailureAction());
      }
      return this.auth.getCurrentUser().pipe(
        map((currentUser: CurrentUserInterface) => {
          return getCurrentUserSuccessAction({ currentUser });
        }),
        catchError(() => {
          return of(getCurrentUserFailureAction());
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
