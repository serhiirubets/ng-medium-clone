import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction
} from "../actions/getArticle.action";
import {ArticleInterface} from "../../../shared/types/article.interface";
import {ArticleService as SharedArticleService} from "../../../shared/services/article.service";

@Injectable()
export class GetArticleEffect {
  constructor(
    private actions$: Actions,
    private router: Router,
    private sharedArticleService: SharedArticleService
  ) {
  }

  getArticleEffect$ = createEffect(() => this.actions$.pipe(
    ofType(getArticleAction),
    switchMap(({ slug }) => {
      return this.sharedArticleService.getArticle(slug).pipe(
        map((article: ArticleInterface) => {
          return getArticleSuccessAction({ article });
        }),
        catchError(() => {
          return of(getArticleFailureAction());
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
