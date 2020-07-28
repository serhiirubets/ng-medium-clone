import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction,
} from '../actions/getFeedAction';
import {FeedService} from '../../service/feed.service';
import {GetFeedResponseInterface} from '../../types/getFeedResponse.interface';

@Injectable()
export class GetFeedEffect {
  constructor(
    private actions$: Actions,
    private feedService: FeedService,
  ) {}

  getFeed$ = createEffect(() => this.actions$.pipe(
    ofType(getFeedAction),
    switchMap(({ url }) => {
      return this.feedService.getFeed(url)
        .pipe(
          map((feed: GetFeedResponseInterface) => {
            return getFeedSuccessAction({ feed });
          }),
          catchError(() => {
             return of(getFeedFailureAction());
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
