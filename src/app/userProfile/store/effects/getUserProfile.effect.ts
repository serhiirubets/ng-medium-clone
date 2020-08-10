import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction
} from "../actions/getUserProfile.action";
import {UserProfileService} from "../../services/userProfile.service";
import {ProfileInterface} from "../../../shared/types/profile.interface";

@Injectable()
export class GetUserProfileEffect {
  constructor(
    private actions$: Actions,
    private userProfileService: UserProfileService,
  ) {}

  getUserProfileEffect$ = createEffect(() => this.actions$.pipe(
    ofType(getUserProfileAction),
    switchMap(({ slug }) => {
      return this.userProfileService.getUserProfile(slug)
        .pipe(
          map((userProfile: ProfileInterface) => {
            return getUserProfileSuccessAction({ userProfile });
          }),
          catchError(() => {
            return of(getUserProfileFailureAction());
          })
        )
    })
  ))
}


// Обновить сервис
// Добавить action type
// новые action
// новые effect
// обновить reducer
