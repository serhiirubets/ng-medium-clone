import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  addToFollowingAction,
  addToFollowingSuccessAction,
  addToFollowingFailureAction
} from "../actions/addToFollowing.action";
import {FollowUserService} from "../../services/followUser.service";
import {ProfileInterface} from "../../../../types/profile.interface";

@Injectable()
export class AddToFollowingEffect {
  constructor(
    private actions$: Actions,
    private followUserService: FollowUserService,
  ) {}

  addToFollowing$ = createEffect(() => this.actions$.pipe(
    ofType(addToFollowingAction),
    switchMap(({ isFollowing, slug }) => {
      const userProfile$ = isFollowing ? this.followUserService.removeFromFollowing(slug) : this.followUserService.addToFollowing(slug);
      return userProfile$
        .pipe(
          map((userProfile: ProfileInterface) => {
            return addToFollowingSuccessAction({ userProfile });
          }),
          catchError(() => {
            return of(addToFollowingFailureAction());
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
